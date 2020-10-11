import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PortfolioItem from "./PortfolioItem"
import styles from "./portfolio-section.module.css"

export default function PortfolioSection() {
	const data = useStaticQuery(
		graphql`
			query portfolioQuery {
				allMarkdownRemark {
					edges {
						node {
							frontmatter {
								date
								link
								slug
								summary
								title
								images {
									id
									childImageSharp {
										id
										fixed(width: 220) {
											base64
											tracedSVG
											aspectRatio
											srcWebp
											srcSetWebp
											originalName
											...GatsbyImageSharpFixed
										}
									}
								}
							}
							html
						}
					}
				}
			}
		`
	)
	const items = data.allMarkdownRemark.edges

	const portfolioItems = items.map(item => {
		const { title, summary, link, slug } = item.node.frontmatter
		// const content = item.node.html
		const image = item.node.frontmatter.images.childImageSharp.fixed

		return (
			<PortfolioItem
				title={title}
				summary={summary}
				link={link}
				slug={slug}
				featuredImage={image}
			/>
		)
	})

	return (
		<div className={styles.portfolioSectionContainer}>
			<h2>My Work</h2>
			<div className={styles.portfolioItems}>{portfolioItems}</div>
		</div>
	)
}
