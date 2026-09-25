import { generateStaticParamsFor, importPage } from "nextra/pages";
import { notFound } from "next/navigation";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

function isNonContentPath(pathSegments) {
  return pathSegments?.some((segment) => segment.startsWith("."));
}

export async function generateMetadata(props) {
  const params = await props.params;

  if (isNonContentPath(params.mdxPath)) {
    return {};
  }

  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;

  if (isNonContentPath(params.mdxPath)) {
    notFound();
  }

  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
