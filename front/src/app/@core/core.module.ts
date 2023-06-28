import { CommonModule } from "@angular/common";
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from "@nebular/auth";
import { NbRoleProvider, NbSecurityModule } from "@nebular/security";
import { of as observableOf } from "rxjs";

import { UserData } from "./data/user.data";
import { MockDataModule } from "./mock/mock-data.module";
import { throwIfAlreadyLoaded } from "./module-import-guard";
import { ServicesModule } from "./services/services.module";
import UserService from "./services/user.service";
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from "./utils";

const socialLinks = [
  {
    url: "https://github.com/akveo/nebular",
    target: "_blank",
    icon: "github",
  },
  {
    url: "https://www.facebook.com/akveo/",
    target: "_blank",
    icon: "facebook",
  },
  {
    url: "https://twitter.com/akveo_inc",
    target: "_blank",
    icon: "twitter",
  },
];

const DATA_SERVICES = [{ provide: UserData, useClass: UserService }];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf("guest");
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...ServicesModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      // TODO - add google autentication strategy
      // NbOAuth2AuthStrategy.setup({
      //   name: 'google',
      //   clientId:
      //     '203484929642-43m98a0q6ftmj39gv2k2fv22gcjslf1d.apps.googleusercontent.com',
      //   clientSecret: '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',
      //   clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
      //   authorize: {
      //     endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      //     responseType: NbOAuth2ResponseType.TOKEN,
      //     scope: 'https://www.googleapis.com/auth/userinfo.profile',
      //     redirectUri: 'http://localhost:8001/callback',
      //   },
      // }),
      // Estrategia de login padrão utilizada na rota auth/login
      NbPasswordAuthStrategy.setup({
        name: "email",
        baseEndpoint: "http://localhost:8000/api/v1/",
        token: {
          class: NbAuthJWTToken,
          key: "access", // this parameter tells where to look for the token
        },
        login: {
          method: "post",
          requireValidToken: true,
          endpoint: "auth/login",
          redirect: {
            success: "/dashboard",
            failure: null,
          },
          defaultErrors: ["Login/Email combination is not correct"],
        },
        register: {
          endpoint: "auth/register",
          method: "post",
          requireValidToken: true,
          redirect: {
            success: "/dashboard",
            failure: null,
          },
          defaultErrors: ["Something went wrong, please try again."],
          defaultMessages: ["You have been successfully registered."],
        },
        logout: {
          method: "post",
          endpoint: "auth/logout",
          redirect: {
            success: "/auth/login",
            failure: null,
          },
        },
        refreshToken: {
          endpoint: "auth/refresh",
          method: "post",
        },
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 10,
            regexp:
              "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/",
          },
          email: {
            required: true,
            regexp: "/^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i",
          },
        },
      }),
    ],

    forms: {
      login: {
        strategy: "email",
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: "*",
      },
      user: {
        parent: "guest",
        create: "*",
        edit: "*",
        remove: "*",
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [CommonModule, NbAuthModule],
  exports: [NbAuthModule],
  providers: [UserService],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
