<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap | Enigma Yazılım</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          #header {
            background-color: #0d1117;
            color: #fff;
            padding: 2rem;
            text-align: center;
          }
          #header h1 {
            margin: 0;
            font-size: 2rem;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          #header p {
            margin: 10px 0 0 0;
            color: #8b949e;
            font-size: 1rem;
          }
          #content {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 20px;
          }
          .table-container {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            overflow: hidden;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            text-align: left;
            padding: 12px 16px;
            font-size: 0.875rem;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #e2e8f0;
            color: #1e293b;
            font-size: 0.875rem;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover {
            background-color: #f8fafc;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
          }
          .count {
            display: inline-block;
            background: #e2e8f0;
            color: #475569;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-left: 8px;
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #020617;
              color: #f8fafc;
            }
            .table-container {
              background: #0f172a;
              border: 1px solid #1e293b;
              box-shadow: none;
            }
            th {
              background-color: #1e293b;
              color: #94a3b8;
              border-bottom-color: #334155;
            }
            td {
              color: #cbd5e1;
              border-bottom-color: #1e293b;
            }
            tr:hover {
              background-color: #1e293b;
            }
            a {
              color: #38bdf8;
            }
            .count {
              background: #334155;
              color: #cbd5e1;
            }
          }
        </style>
      </head>
      <body>
        <div id="header">
          <h1>Enigma Yazılım XML Sitemap</h1>
          <p>This is a human-readable XML sitemap designed for search engines.</p>
        </div>
        <div id="content">
          <p style="margin-bottom: 1rem; font-weight: 500;">
            Number of URLs in this sitemap: <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
          </p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Priority</th>
                  <th>Change Freq.</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="concat(sitemap:priority*100, '%')"/>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td>
                      <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
