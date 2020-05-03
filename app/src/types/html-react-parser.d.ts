declare module 'react-html-parser' {
  import { ReactElement } from 'react'

  interface Node {
    type: string
    name: string
    children: Node[]
    next: Node | null
    prev: Node | null
    parent: Node | null
    attribs: {
      style?: string
      [key: string]: string
    }
    data: string
  }

  export type TransformFunction = (
    node: Node,
    index: number,
  ) => ReactElement<any> | undefined | null

  export default function ReactHtmlParser(
    html: string,
    options?: {
      decodeEntities?: boolean
      transform?: TransformFunction
      preprocessNodes?: (node: Node) => Node
    },
  ): ReactElement<any>

  export function convertNodeToElement(
    node: Node,
    index: number,
    transform: TransformFunction,
  ): ReactElement<any>
}
