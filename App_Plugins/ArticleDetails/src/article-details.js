import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { html, css } from "@umbraco-cms/backoffice/external/lit";
import { umbHttpClient } from "@umbraco-cms/backoffice/http-client";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";

// The Management API endpoint you created in the controller
const API_URL = "/umbraco/management/api/v1/article-details/stats";

 // Styles: uses UUI design tokens for consistent backoffice look & spacing
export default class ArticleDetailsDashboard extends UmbLitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--uui-size-layout-1);
    }
    .muted {
      color: var(--uui-color-text-alt);
    }
    .big {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--uui-size-space-6);
      margin-top: var(--uui-size-space-4);
    }
    .titleCards {
      display: grid;
      gap: var(--uui-size-space-3);
    }
  `;

  // Reactive state: changes trigger re-render
  static properties = {
    loading: { type: Boolean },
    stats: { type: Object },
    error: { type: String },
  };

  static #clientConfigPromise;

  constructor() {
    super();
    this.loading = true;
    this.stats = null;
    this.error = "";
  }

    // load data when the element is attached to the DOM
  connectedCallback() {
    super.connectedCallback();
    this.#load();
  }
  
  // Auth + HTTP client configuration: ensures every request gets a fresh Bearer token
  async #ensureHttpClientConfigured() {
    if (ArticleDetailsDashboard.#clientConfigPromise) return ArticleDetailsDashboard.#clientConfigPromise;

    ArticleDetailsDashboard.#clientConfigPromise = new Promise((resolve) => {
      this.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
        if (!authContext) return;

        const config = authContext.getOpenApiConfiguration();

        umbHttpClient.setConfig({
          baseUrl: config.base,
          credentials: config.credentials,
        });

        umbHttpClient.interceptors.request.use(async (request) => {
          const token = await config.token();
          request.headers.set("Authorization", `Bearer ${token}`);
          return request;
        });

        resolve();
      });
    });

    return ArticleDetailsDashboard.#clientConfigPromise;
  }

  // calls the Management API and updates state for rendering
  async #load() {
    this.loading = true;
    this.error = "";
    this.stats = null;

    await this.#ensureHttpClientConfigured();

    const request = umbHttpClient.get({ url: API_URL });

    const { data, error } = await tryExecute(this, request, { disableNotifications: true });

    if (error) {
      this.error = "Could not load article stats.";
    } else {
      this.stats = data ?? null;
    }

    this.loading = false;
  }

  
  // uses UUI components and shows loading/error/success states
  render() {
    return html`
      <uui-box headline="Article stats">
        ${this.loading
          ? html`<uui-loader></uui-loader>`
          : this.error
          ? html`
              <uui-banner color="danger" headline="Error">
                ${this.error}
                <div class="muted">API: ${API_URL}</div>
              </uui-banner>
            `
          : html`
              <div class="cards">
                <uui-box headline="Total articles">
                  <div class="big">${this.stats?.totalArticles ?? 0}</div>
                  <div class="muted">Number of Article items</div>
                </uui-box>

                <uui-box headline="Latest titles">
                  ${Array.isArray(this.stats?.latestTitles) && this.stats.latestTitles.length
                    ? html`
                        <div class="titleCards">
                          ${this.stats.latestTitles.map(
                            (t) => html`
                              <uui-card-content-node name="${t}">
                                <span slot="detail" class="muted">Article</span>
                              </uui-card-content-node>
                            `
                          )}
                        </div>
                      `
                    : html`<div class="muted">No articles found.</div>`}
                </uui-box>
              </div>
            `}
      </uui-box>
    `;
  }
}

customElements.define("article-details-dashboard", ArticleDetailsDashboard);