import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ApiService } from 'src/app/config/provider/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class TinymceEditorService {

  constructor(
    private service: ApiService,
    private domSanitizer: DomSanitizer
  ) { }

  info(id): Observable<any> {
    const a = `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="/assets/image/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /></p>
          <h2 style="text-align: center;" class="mceNonEditable" contenteditable="false">Welcome to the TinyMCE Cloud demo!</h2>
          <h5 style="text-align: center;">Note, this includes some "enterprise/premium" features.<br />Visit the <a href="../../../pricing/#demo-enterprise">pricing page</a> to learn more about our premium plugins.</h5>
          <p>Please try out the features provided in this full featured example.</p>
          <h2>Got questions or need help?</h2>
          <ul>
            <li>Our <a class="mceNonEditable" href="../../">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
            <li>Have a specific question? Visit the <a class="mceNonEditable" href="https://community.tiny.cloud/forum/">Community Forum</a>.</li>
            <li>We also offer enterprise grade support as part of <a href="../../../pricing">TinyMCE premium subscriptions</a>.</li>
          </ul>
          <table style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                <th>标题</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td contenteditable="true"></td>
              </tr>
            </tbody>
          </table>
          <h2>A simple table to play with</h2>
          <table style="text-align: center; border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
              <th class="mceEditable" contenteditable="true">Product</th>
              <th>Cost</th>
              <th>Really?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TinyMCE Cloud</td>
                <td>Get started for free</td>
                <td>YES!</td>
              </tr>
              <tr>
                <td>Plupload</td>
                <td>Free</td>
                <td>YES!</td>
              </tr>
            </tbody>
          </table>
          <h2>Found a bug?</h2>
          <p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
          <h2>Finally ...</h2>
          <p>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
          <p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br />All the best from the TinyMCE team.</p>
        </body>
      </html>
      `;
    const html = document.createElement('html');
    html.innerHTML = a;
    for (let index = 0; index < html.children.length; index++) {
      if (html.children[index].tagName === 'body') {
        html.children[index].setAttribute('contenteditable', 'false');
      }
    }
    return of(html.outerHTML);
  }
}
