import { pagePreview } from "../../../graphql_states/contentstack";
import { isNil, map } from 'lodash'
import createApolloClient from "../../../../apollo_client";


const mapSubtitles = (subtitleCmsId, data) => {
  const locales = JSON.parse(process.env.APP_LOCALE)
  data = data.filter((d) => !isNil(d.subtitles))

  return map(data, ({subtitles, locale}) => ({
    title: subtitles.title,
    id: subtitleCmsId,
    language: locale,
    label: locales[locale],
    url: subtitles.fileConnection.edges[0] && subtitles.fileConnection.edges[0].node.url,
  }))
}

export const useVideoSubTitles = async (subtitleCmsId) => {
  // const client = createApolloClient();

  // const enUsSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'en-us',}, fetchPolicy: 'network-only' },
  // );

  // const deDeSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'fr-fr',}, fetchPolicy: 'network-only' },
  // );

  // const frFrSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'de-de',}, fetchPolicy: 'network-only' },
  // );

  // const zhCnSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'zh-cn',}, fetchPolicy: 'network-only' },
  // );

  // const ptBrSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'pt-br',}, fetchPolicy: 'network-only' },
  // );

  // const es419SubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'es-419',}, fetchPolicy: 'network-only' },
  // );

  // const itItSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'it-it',}, fetchPolicy: 'network-only' },
  // );

  // const trTrSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'tr-tr',}, fetchPolicy: 'network-only' },
  // );

  // const jaJpSubtitleData = await client.query({
  //   query: pagePreview.queries.GET_VIDEO_SUBTITLE,
  //   variables: {subtitleCmsId: subtitleCmsId, locale: 'ja-jp',}, fetchPolicy: 'network-only' },
  // );

  // const  subtitles = mapSubtitles(subtitleCmsId, [
  //   {...enUsSubtitleData.data, locale: 'en-us'},
  //   {...deDeSubtitleData.data, locale: 'de-de'},
  //   {...frFrSubtitleData.data, locale: 'fr-fr'},
  //   {...zhCnSubtitleData.data, locale: 'zh-cn'},
  //   {...ptBrSubtitleData.data, locale: 'pt-br'},
  //   {...es419SubtitleData.data, locale: 'es-419'},
  //   {...itItSubtitleData.data, locale: 'it-it'},
  //   {...trTrSubtitleData.data, locale: 'tr-tr'},
  //   {...jaJpSubtitleData.data, locale: 'ja-jp'},
  // ])
  return {
    subtitles: [],
    loading: false,
  }
}
