export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "Document",
        possibleTypes: [
          {
            name: "Post"
          },
          {
            name: "Page"
          },
          {
            name: "PostCollection"
          },
          {
            name: "SiteSettings"
          },
          {
            name: "SanityImageAsset"
          },
          {
            name: "SanityFileAsset"
          }
        ]
      },
      {
        kind: "UNION",
        name: "PageOrPostOrPostCollection",
        possibleTypes: [
          {
            name: "Page"
          },
          {
            name: "Post"
          },
          {
            name: "PostCollection"
          }
        ]
      },
      {
        kind: "UNION",
        name:
          "BlockOrFileAssetOrMultipleImagesOrPdfEmbedOrPostImageOrSpeakerDeckOrVideoAsset",
        possibleTypes: [
          {
            name: "Block"
          },
          {
            name: "FileAsset"
          },
          {
            name: "MultipleImages"
          },
          {
            name: "PdfEmbed"
          },
          {
            name: "PostImage"
          },
          {
            name: "SpeakerDeck"
          },
          {
            name: "VideoAsset"
          }
        ]
      }
    ]
  }
};

export default result;
