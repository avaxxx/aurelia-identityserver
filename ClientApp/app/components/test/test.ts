import { User } from 'oidc-client';
import { UserManager } from 'oidc-client';
import { autoinject } from 'aurelia-framework';
import { BaseViewModel } from './../../../BaseViewModel';
import {HttpClient} from 'aurelia-fetch-client';


export class Test extends BaseViewModel
{
    constructor(){
      super();
    }

    callApi = async () =>  {

        let token = "";
        if (this.user != undefined)
        {
            token = this.user.access_token;
        }

        let client = new HttpClient();
        
        client.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('/api/')
              .withDefaults({
                credentials: 'same-origin',
                headers: {
                  'X-Requested-With': 'Fetch'
                }
              })
              .withInterceptor({
                request(request) {
                  if (token != "")
                  {
                    request.headers.append('Authorization', 'Bearer ' + token);                    
                  }
                  return request;
                }
              });
          });

          try
          {
            let response = await client.fetch('identity');
            let json = await response.json();
            console.log(json);
          }
          catch(e)
          {
            this.logger.error("And the error is - " + (<Error>e).message);
          }
          

            client
              .fetch('identity')
              .then(response => response.json())
              .then(data => {
                console.log(data);
              })
              .catch(e => this.logger.error(e));
    }
}