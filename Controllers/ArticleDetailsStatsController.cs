using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core;
using Umbraco.Cms.Web.Common.Authorization;

namespace Umbraco17.Controllers
{

    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess, Roles = Constants.Security.AdminGroupAlias)]
    [VersionedApiBackOfficeRoute("article-details/stats")]
    public class ArticleDetailsStatsController : ManagementApiControllerBase
    {
        private readonly IPublishedContentQuery _publishedContentQuery;

        private const string ArticleListDocTypeAlias = "articleList";
        private const string ArticleDocTypeAlias = "article";      
        private const string PublishedDatePropertyAlias = "publishedDate"; 
                                                                           
        // How many titles to return
        private const int LatestTake = 3;

        public ArticleDetailsStatsController(IPublishedContentQuery publishedContentQuery)
            => _publishedContentQuery = publishedContentQuery;

        [HttpGet]
        public IActionResult Get()
        {
            var root = _publishedContentQuery.ContentAtRoot()
                .FirstOrDefault(x => x.ContentType.Alias.InvariantEquals(ArticleListDocTypeAlias));

            if (root is null)
                return Ok(new ArticleStatsResponse(0, Array.Empty<string>()));

            var articles = root.DescendantsOrSelf()
                .Where(x => x.ContentType.Alias.InvariantEquals(ArticleDocTypeAlias))
                .ToList();

            // Ordering the articles based on published date field.
            var latestTitles = articles.OrderByDescending(x => x.Value<DateTime>(PublishedDatePropertyAlias))
                .Take(LatestTake)
                .Select(x => x.Name)
                .ToArray();

            return Ok(new ArticleStatsResponse(articles.Count, latestTitles));
        }

        public record ArticleStatsResponse(int TotalArticles, string[] LatestTitles);

    }
}
