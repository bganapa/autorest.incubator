/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Model } from '#common/code-model/code-model';
import { ModelState } from '#common/model-state';
import { Host, JsonPath } from '@microsoft.azure/autorest-extension-base';
import { Project } from './project';

export interface GeneratorSettings {
  azure: boolean;
  cmdletFolder: string;
  customFolder: string;
  runtimefolder: string;
  moduleName: string;
  csproj: string;
  psd1: string;
  psm1: string;
  apifolder: string;
}

export class State extends ModelState<Model> {
  public get project(): Project {
    if (this.prj) {
      return this.prj;
    }
    throw new Error();
  }

  public set project(prj: Project) {
    this.prj = prj;
  }
  constructor(service: Host, model: Model, documentName: string, currentPath: JsonPath = new Array<string>(), private prj?: Project) {
    super(service, model, documentName, currentPath);
  }

  public path(...childPath: JsonPath): State {
    return new State(this.service, this.model, this.documentName, [...this.currentPath, ...childPath], this.project);
  }
}
