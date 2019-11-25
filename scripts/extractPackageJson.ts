import * as Octokit from "@octokit/rest";
import * as fs from "fs";
import { PackageJson } from "type-fest";
import * as path from "path";
import { ExtractPackageJsonResult } from "@app/interface";
import * as Constants from "./Constants";

const github = new Octokit({
  baseUrl: Constants.GITHUB_BASE_URL,
  token: process.env.GITHUB_TOKEN,
});

export const getRepository = async (org: string) => {
  const list = await github.repos.listForOrg({
    org,
    per_page: 100,
  });
  return list.data.filter(data => !data.archived && !Constants.EXCLUDE_REPOSITORY_FULL_NAMES.includes(data.full_name));
};

export const searchPackageJson = async (repo: string) => {
  const query = {
    filename: "package.json",
    repo: repo,
    extension: "json",
  };
  const q: string = Object.entries(query)
    .map(([k, v]) => `${k}:${v}`)
    .join("+");
  const list = await github.search.code({
    q,
  });
  return list.data;
};

export const getPackageJson = async (owner: string, repo: string, filepath: string): Promise<{ data: PackageJson; htmlUrl: string }> => {
  const contents = await github.repos.getContents({
    owner,
    repo,
    path: filepath,
  });
  const d = contents.data as Octokit.ReposGetContentsResponse;
  if (Array.isArray(d)) {
    throw new TypeError("配列なので受け付けません");
  }
  const buffer = Buffer.from(d.content || "", d.encoding as "base64");
  return {
    data: JSON.parse(buffer.toString()),
    htmlUrl: d.html_url,
  };
};

const main = async () => {
  const owners = Constants.OWNERS;
  const result: ExtractPackageJsonResult = { createdAt: new Date().toISOString(), packageJsonList: [] };
  const promises = owners.map(async owner => {
    const repos = await getRepository(owner);
    const promises2 = repos.map(async repo => {
      const data = await searchPackageJson(repo.full_name);
      const promises3 = data.items.map(async source => {
        if (path.basename(source.path) !== "package.json") {
          return;
        }
        const pkgJson = await getPackageJson(owner, repo.name, source.path);
        const basename = path.join(owner, repo.name, source.path);
        result.packageJsonList.push({
          filename: basename,
          sourceUrl: pkgJson.htmlUrl,
          repoName: repo.full_name,
          repoUrl: repo.html_url,
          branch: repo.default_branch,
        });
        const filename = path.join(Constants.SAVE_DIR, basename);
        fs.mkdirSync(path.dirname(filename), { recursive: true });
        fs.writeFileSync(filename, JSON.stringify(pkgJson.data, null, 2), { encoding: "utf-8" });
      });
      return Promise.all(promises3);
    });
    return Promise.all(promises2);
  });
  await Promise.all(promises).then(() => {
    console.log(`Save: ${Constants.PKG_DETAILS}`);
    fs.writeFileSync(Constants.PKG_DETAILS, JSON.stringify(result, null, 2));
  });
};

main().catch(console.error);
