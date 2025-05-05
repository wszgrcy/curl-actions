import * as core from '@actions/core'

export async function run(): Promise<void> {
  try {
    const headers = core.getMultilineInput('headers')
    const body = core.getInput('body')
    const method = core.getInput('method')
    const url = core.getInput('url')
    // core.info(headers.join('\n'))
    // core.info(body)
    // core.info(method)
    // core.info(url)
    let headersList = headers.reduce(
      (obj, item) => {
        let index = item.indexOf(':')
        let key = item.slice(0, index)
        let value = item.slice(index + 1)
        obj[key] = value
        return obj
      },
      {} as Record<string, any>
    )
    // core.info(JSON.stringify(headersList))
    let bodyContent = body
    // core.info(bodyContent)
    let response = await fetch(url, {
      method: method,
      body: bodyContent,
      headers: headersList
    })

    let data = await response.text()
    console.log(data)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
