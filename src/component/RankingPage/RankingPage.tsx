import * as React from "react";
import { BaseStyles, Box } from "@primer/components";
import { classNames } from "@app/style";
import { RankingDataSet } from "@app/interface";
import * as HeaderNavigation from "../HeaderNavigation/HeaderNavigation";

interface RankingPageProps {
  headerNavigation: HeaderNavigation.Props;
  dataSet: RankingDataSet;
}

const RankingPage = ({ headerNavigation, dataSet }: RankingPageProps) => {
  return (
    <BaseStyles>
      <HeaderNavigation.Component {...headerNavigation} />
      <Box className={classNames("border d-flex lex-wrap height-fit markdown-body")}>
        <table>
          <thead>
            <tr>
              <td>Index</td>
              <td>PackageName</td>
              <td>Detail</td>
            </tr>
          </thead>
          <tbody>
            {dataSet.list.map((item, idx) => {
              return (
                <tr key={`${item.packageName}-${idx}`}>
                  <td key="index">{idx + 1}</td>
                  <td key="package-name">
                    <em>{item.packageName}</em>
                  </td>
                  <td key="detail">
                    <details className={classNames("details-overlay")}>
                      <summary className={classNames("btn")}>More {item.usageLibraries.length} using</summary>
                      <div className={classNames("border p-3 mt-2")}>
                        <table>
                          {item.usageLibraries.map((lib, idx2) => {
                            return (
                              <tr key={`${lib.packageName}-${idx2}`}>
                                <td>
                                  <a href={lib.url} target="_blank">
                                    {lib.packageName}
                                  </a>
                                </td>
                                <td>{lib.required}</td>
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
    </BaseStyles>
  );
};

export { RankingPageProps as Props, RankingPage as Component };
