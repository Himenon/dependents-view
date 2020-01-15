import * as Octokit from "@octokit/rest";
import * as fs from "fs";
import * as path from "path";
import { ExtractPackageJson } from "@app/interface";
import * as Constants from "./Constants";
import * as url from "native-url";
import pLimit from "p-limit";

const github = new Octokit({
  baseUrl: Constants.GITHUB_BASE_URL,
  // https://developer.github.com/v3/search/#rate-limit
  auth: process.env.GITHUB_TOKEN,
});

export const getRepository = async (org: string) => {
  // https://developer.github.com/v3/repos/
  const list = await github.repos.listForOrg({
    org,
    per_page: 100,
  });
  const data: Octokit.ReposListForOrgResponseItem[] = list.data;
  return data.filter(data => !data.archived && !Constants.EXCLUDE_REPOSITORY_FULL_NAMES.includes(data.full_name));
};

export const encodeBase64 = (base64string: string): string => {
  return Buffer.from(base64string, "base64").toString();
};

export const searchPackageJson = async (repo: string): Promise<Octokit.SearchCodeResponse | undefined> => {
  console.log(`Search: ${repo}`);
  const query = {
    filename: "package.json",
    repo: repo,
    extension: "json",
  };
  const q: string = Object.entries(query)
    .map(([k, v]) => `${k}:${v}`)
    .join("+");
  try {
    const list = await github.search.code({
      q,
    });
    return list.data;
  } catch (error) {
    console.error(`Search Error : ${repo}`);
    return undefined;
  }
};

export const getPackageJsonData = async (
  owner: string,
  repo: string,
  filepath: string,
): Promise<Octokit.ReposGetContentsResponse | undefined> => {
  try {
    // https://developer.github.com/v3/repos/contents/
    const content = await github.repos.getContents({
      owner,
      repo,
      path: filepath,
    });
    return content.data;
  } catch (error) {
    console.log(`content error: ${owner}/${repo}`);
    return undefined;
  }
};

const main = async () => {
  const result: ExtractPackageJson = { createdAt: new Date().toISOString(), repositories: [] };
  const promises = Constants.OWNERS.map(async owner => {
    const repos = await getRepository(owner);
    const limit = pLimit(2);
    const promises2 = repos.map(async repo => {
      return limit(async () => {
        const data = await searchPackageJson(repo.full_name);
        if (!data) {
          return;
        }
        const promises3 = data.items.map(async source => {
          if (path.basename(source.path) !== "package.json") {
            return;
          }
          const pkgJsonData = await getPackageJsonData(owner, repo.name, source.path);
          if (!pkgJsonData) {
            return;
          }
          if (Array.isArray(pkgJsonData)) {
            throw new TypeError("配列なので受け付けません");
          }
          const basename = path.join(owner, repo.name, source.path);
          const hostname = url.parse(repo.url).hostname;
          if (!hostname) {
            throw new Error("hostnameが見つかりません");
          }
          result.repositories.push({
            meta: {
              hostname,
            },
            source: {
              filename: basename,
              url: pkgJsonData.html_url,
              path: pkgJsonData.path,
            },
            repo: {
              owner: repo.owner.login,
              name: repo.name,
              url: repo.html_url,
              fullName: repo.full_name,
              branch: repo.default_branch,
            },
          });
          const filename = path.join(Constants.SAVE_DIR, basename);
          fs.mkdirSync(path.dirname(filename), { recursive: true });
          const content = JSON.parse(encodeBase64(pkgJsonData.content || ""));
          fs.writeFileSync(filename, JSON.stringify(content, null, 2), { encoding: "utf-8" });
        });
        return Promise.all(promises3);
      });
    });
    return Promise.all(promises2);
  });
  await Promise.all(promises).then(() => {
    console.log(`Save: ${Constants.PKG_DETAILS}`);
    fs.writeFileSync(Constants.PKG_DETAILS, JSON.stringify(result, null, 2));
  });
};

main().catch(console.error);
