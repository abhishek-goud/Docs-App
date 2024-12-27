// interface DocumentIdPageProps {
//     params: Promise<{ documentId: string }>;
// }

// const DocumentIdPage = async (props: DocumentIdPageProps) => {
//     const awaitedParams = await props.params; // Accessing params via props
//     const documentId = awaitedParams.documentId; // Extracting documentId from awaitedParams
//     return <div>Document ID: {documentId}</div>;
// };

// export default DocumentIdPage;

// const awaitedParams = await params;  //await in only used after next.js 15
// const documentId = awaitedParams.documentId


import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import {auth} from "@clerk/nextjs/server"
import { preloadQuery } from "convex/nextjs";

interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  const {getToken} = await auth();
  const token = await getToken({template: "convex"}) ?? undefined;
  if(!token) {
    throw new Error("Unauthorized")
  }

  const preloadedDocument = await preloadQuery(api.documents.getById, {id: documentId}, {token})
  if(!preloadedDocument){
    throw new Error("Document not found")
  }
  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;
