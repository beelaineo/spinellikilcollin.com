import easygraphqlMock from 'easygraphql-mock'
import * as fs from 'fs'
import * as path from 'path'

const userSchema = fs.readFileSync(path.join(__dirname, '..', 'schema.graphql'), 'utf8')

export const mockedSchema = easygraphqlMock(userSchema)
