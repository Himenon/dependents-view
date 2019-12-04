import * as React from "react";
import { BaseStyles, Box } from "@primer/components";
import { classNames } from "@app/style";
import { RankingDataSet } from "@app/interface";
import * as HeaderNavigation from "../HeaderNavigation/HeaderNavigation";

interface RankingPageProps {
  headerNavigation: HeaderNavigation.Props;
  dataSet: RankingDataSet;
  searchInput: JSX.IntrinsicElements["input"];
}

const RankingPage = ({ headerNavigation, searchInput, dataSet }: RankingPageProps) => {
  return (
    <BaseStyles>
      <HeaderNavigation.Component {...headerNavigation} />
      <Box className={classNames("border d-flex lex-wrap height-fit markdown-body")}>
        <Box className={classNames("position-relative")} style={{ marginLeft: 50, width: "calc(100% - 360px)" }}>
          <Box style={{ marginBottom: "0.5em", marginTop: "0.5em" }}>
            <h3>Search Package Name</h3>
            <input className={classNames("input-block form-control")} {...searchInput} />
          </Box>
          <Box>
            <h3>Package List</h3>
            <table>
              <thead>
                <tr>
                  <td>Rank</td>
                  <td>PackageName</td>
                  <td>Detail</td>
                </tr>
              </thead>
              <tbody>
                {dataSet.list.map((item, idx) => {
                  return (
                    <tr key={`${item.packageName}-${idx}`}>
                      <td key="index">{item.rank}</td>
                      <td key="package-name">
                        <em>{item.packageName}</em>
                      </td>
                      <td key="detail">
                        <details className={classNames("details-reset mt-3")}>
                          <summary className={classNames("btn")}>
                            More {item.usageLibraries.length} using
                            <span className={classNames("dropdown-caret")} />
                          </summary>
                          <div className={classNames("border p-3 mt-2")}>
                            <table>
                              {item.usageLibraries.map((lib, idx2) => {
                                return (
                                  <tr key={`${lib.packageName}-${idx2}`}>
                                    <td>
                                      <a href={lib.repo.url} target="_blank">
                                        {lib.packageName}
                                      </a>
                                    </td>
                                    <td>
                                      <a href={lib.source.url} target="_blank">
                                        {lib.required}
                                      </a>
                                    </td>
                                    <td>{lib.usageType}</td>
                                  </tr>
                                );
                              })}
                            </table>
                          </div>
                        </details>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </BaseStyles>
  );
};

export { RankingPageProps as Props, RankingPage as Component };
