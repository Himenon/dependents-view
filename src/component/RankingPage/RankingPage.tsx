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
      <Box className={classNames("border d-flex lex-wrap height-fit")}>
        <ul>
          {dataSet.list.map((item, idx) => {
            return (
              <li key={`${item.packageName}-${idx}`}>
                <p>
                  <em>{item.packageName}</em>
                </p>
                <ul>
                  {item.usageLibraries.map((lib, idx2) => {
                    return (
                      <li key={`${lib.packageName}-${idx2}`}>
                        <p>{lib.packageName}</p>
                        <p>
                          <a href={lib.url} target="_blank">
                            {lib.required}
                          </a>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </Box>
    </BaseStyles>
  );
};

export { RankingPageProps as Props, RankingPage as Component };
