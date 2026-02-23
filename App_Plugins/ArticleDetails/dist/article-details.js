import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
import { css as d, html as t } from "@umbraco-cms/backoffice/external/lit";
import { umbHttpClient as r } from "@umbraco-cms/backoffice/http-client";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
import { UMB_AUTH_CONTEXT as m } from "@umbraco-cms/backoffice/auth";
const n = "/umbraco/management/api/v1/article-details/stats";
class e extends u {
  static styles = d`
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
    error: { type: String }
  };
  static #t;
  constructor() {
    super(), this.loading = !0, this.stats = null, this.error = "";
  }
  // load data when the element is attached to the DOM
  connectedCallback() {
    super.connectedCallback(), this.#i();
  }
  // Auth + HTTP client configuration: ensures every request gets a fresh Bearer token
  async #e() {
    return e.#t ? e.#t : (e.#t = new Promise((i) => {
      this.consumeContext(m, async (a) => {
        if (!a) return;
        const s = a.getOpenApiConfiguration();
        r.setConfig({
          baseUrl: s.base,
          credentials: s.credentials
        }), r.interceptors.request.use(async (o) => {
          const l = await s.token();
          return o.headers.set("Authorization", `Bearer ${l}`), o;
        }), i();
      });
    }), e.#t);
  }
  // calls the Management API and updates state for rendering
  async #i() {
    this.loading = !0, this.error = "", this.stats = null, await this.#e();
    const i = r.get({ url: n }), { data: a, error: s } = await c(this, i, { disableNotifications: !0 });
    s ? this.error = "Could not load article stats." : this.stats = a ?? null, this.loading = !1;
  }
  // uses UUI components and shows loading/error/success states
  render() {
    return t`
      <uui-box headline="Article stats">
        ${this.loading ? t`<uui-loader></uui-loader>` : this.error ? t`
              <uui-banner color="danger" headline="Error">
                ${this.error}
                <div class="muted">API: ${n}</div>
              </uui-banner>
            ` : t`
              <div class="cards">
                <uui-box headline="Total articles">
                  <div class="big">${this.stats?.totalArticles ?? 0}</div>
                  <div class="muted">Number of Article items</div>
                </uui-box>

                <uui-box headline="Latest titles">
                  ${Array.isArray(this.stats?.latestTitles) && this.stats.latestTitles.length ? t`
                        <div class="titleCards">
                          ${this.stats.latestTitles.map(
      (i) => t`
                              <uui-card-content-node name="${i}">
                                <span slot="detail" class="muted">Article</span>
                              </uui-card-content-node>
                            `
    )}
                        </div>
                      ` : t`<div class="muted">No articles found.</div>`}
                </uui-box>
              </div>
            `}
      </uui-box>
    `;
  }
}
customElements.define("article-details-dashboard", e);
export {
  e as default
};
//# sourceMappingURL=article-details.js.map
