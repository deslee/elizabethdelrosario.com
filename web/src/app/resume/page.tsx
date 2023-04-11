import { processor } from "@/components/RehypeProcessor";
import { graphql } from "@/gql";
import { filterNonNullish } from "@/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { cache, Fragment } from "react";
import { graphQLClient } from "../graphql-client";

const getData = cache(async () => {
  const query = graphql(/* GraphQL */ `
    query Resume {
      resume {
        data {
          id
          attributes {
            title
            email
            intro
            experience {
              id
              title
              position
              startDate
              endDate
              description
              icon {
                data {
                  attributes {
                    url
                    width
                    height
                    alternativeText
                  }
                }
              }
            }
            software {
              id
              name
              icon {
                data {
                  attributes {
                    url
                    width
                    height
                    alternativeText
                  }
                }
              }
            }
            education {
              id
              name
              degree
              graduationDate
              description
              icon {
                data {
                  attributes {
                    url
                    width
                    height
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const data = await graphQLClient.request(query);

  if (!data.resume?.data?.attributes) {
    throw new Error("Resume not found!");
  }

  return {
    resume: data.resume.data.attributes,
  };
});

export default async function Resume() {
  const { resume } = await getData();
  return (
    <div className="container max-w-3xl mx-auto mt-16">
      <div className="prose">
        <h1>{resume.title}</h1>
        <p>{resume.email}</p>
        <p>{resume.intro}</p>

        <h2>Work Experience</h2>
        {resume.experience.filter(filterNonNullish).map((experience) => (
          <Fragment key={experience.id}>
            <div className="flex gap-2">
              <div className="max-w-[100px]">
                {experience.icon?.data?.attributes && (
                  <Image
                    src={experience.icon.data.attributes.url}
                    width={experience.icon?.data?.attributes.width ?? 0}
                    height={experience.icon?.data?.attributes.height ?? 0}
                    alt={
                      experience.icon?.data?.attributes.alternativeText ?? ""
                    }
                  />
                )}
              </div>
              <div>
                <h3>{experience.title}</h3>
                <div>
                  {experience.position} |{" "}
                  {format(parseISO(experience.startDate), "MMMM yyyy")} -{" "}
                  {experience.endDate
                    ? format(parseISO(experience.endDate), "MMMM yyyy")
                    : "Present"}
                </div>
              </div>
            </div>
            <div className="m-2">
              {processor.processSync(experience.description).result}
            </div>
          </Fragment>
        ))}

        <h2>Software</h2>
        <ul>
          {resume.software.filter(filterNonNullish).map((software) => (
            <Fragment key={software.id}>
              <li className="flex gap-2 prose-sm">
                <div className="max-w-[100px]">
                  {software.icon?.data?.attributes && (
                    <Image
                      src={software.icon.data.attributes.url}
                      width={software.icon?.data?.attributes.width ?? 0}
                      height={software.icon?.data?.attributes.height ?? 0}
                      alt={
                        software.icon?.data?.attributes.alternativeText ?? ""
                      }
                    />
                  )}
                </div>
                <div>{software.name}</div>
              </li>
            </Fragment>
          ))}
        </ul>

        <h2>Education</h2>
        {resume.education.filter(filterNonNullish).map((education) => (
          <Fragment key={education.id}>
            <div className="flex gap-2">
              <div className="max-w-[100px]">
                {education.icon?.data?.attributes && (
                  <Image
                    src={education.icon.data.attributes.url}
                    width={education.icon?.data?.attributes.width ?? 0}
                    height={education.icon?.data?.attributes.height ?? 0}
                    alt={education.icon?.data?.attributes.alternativeText ?? ""}
                  />
                )}
              </div>
              <div>
                <h3>{education.name}</h3>
                <p>
                  {format(parseISO(education.graduationDate), "MMMM yyyy")}{" "}
                  -&nbsp;
                  {education.degree}
                </p>
              </div>
            </div>
            <div className="m-2">
              {processor.processSync(education.description).result}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
