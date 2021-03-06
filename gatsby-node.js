exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions
	const portfolioEntryTemplate = require.resolve(
		`./src/templates/portfolio-entry.js`
	)
	// prettier-ignore
	const result = await graphql(
		`
			{
				allMarkdownRemark(
					filter: { 
						frontmatter: {
							slug: {
								regex: "/portfolio|section/"
							}
						}
					}
					sort: { order: DESC, fields: [frontmatter___date] }
					limit: 1000
				) {
					edges {
						node {
							frontmatter {
								slug
							}
						}
					}
				}
			}
		`
	)

	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`)
		return
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.slug,
			component: portfolioEntryTemplate,
			context: {
				slug: node.frontmatter.slug,
			},
		})
	})
}
