import * as path from "path";

export const GITHUB_BASE_URL = "https://api.github.com";

export const OWNERS = [];

export const SAVE_DIR = path.join(__dirname, "../src", "dataSet");

export const PKG_DETAILS = path.join(SAVE_DIR, "details.json");

export const DEPS_DATA = path.join(SAVE_DIR, "deps.json");

export const EXCLUDE_REPOSITORY_FULL_NAMES = [""];
