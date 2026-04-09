import { DocPage } from "./types";
import { installationPage, quickStartPage, configurationPage, apiKeysPage } from "./getting-started";
import { bmadMethodPage, personalizationPage, tuiGuidePage, mcpIntegrationPage, openrouterPage } from "./guides";
import { architectureOverviewPage, autoresearchPage, modelRouterPage, infiniteGentlemanPage, kernelFineTuningPage } from "./architecture";
import { benchmarksPage, cliReferencePage, slashCommandsPage, toolsReferencePage, designSystemsPage, hooksReferencePage, contributingPage } from "./reference";

export const allPages: DocPage[] = [
  installationPage,
  quickStartPage,
  configurationPage,
  apiKeysPage,
  bmadMethodPage,
  personalizationPage,
  tuiGuidePage,
  mcpIntegrationPage,
  openrouterPage,
  architectureOverviewPage,
  infiniteGentlemanPage,
  kernelFineTuningPage,
  autoresearchPage,
  modelRouterPage,
  benchmarksPage,
  cliReferencePage,
  slashCommandsPage,
  toolsReferencePage,
  designSystemsPage,
  hooksReferencePage,
  contributingPage,
];

export function getPageBySlug(slug: string): DocPage | undefined {
  return allPages.find((p) => p.slug === slug);
}

export { navigation } from "./types";
