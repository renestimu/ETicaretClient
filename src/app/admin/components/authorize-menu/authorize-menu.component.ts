import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BaseComponent } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationService } from 'src/app/services/common/models/application.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.css'],
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private applicationService: ApplicationService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }
  async ngOnInit() {
    this.dataSource.data = (
      await this.applicationService.getAuthorizeDefinitionEndpoints()
    ).map((m) => {
      const menu: ITreeMenu = {
        name: m.name,
        actions: m.actions.map((a) => ({
          name: a.definition,
          code: a.code,
          actions: [],
          menuName: m.name,
        })),
      };
      return menu;
    });
  }

  assignRole(code: string,name:string,menuName: string) {
    // Implement the logic to assign a role to the menu item
    console.log(`Assigning role for code: ${code}`);
    this.dialogService.openDialog({
      componetType: AuthorizeMenuDialogComponent,
      data: { code, name, menuName },
      options: {
        width: '750px',
      },
      afterClosed: () => {}
    });
  }

  private _transformer = (menu: ITreeMenu, level: number) => {
    return {
      expandable: !!menu.actions && menu.actions.length > 0,
      name: menu.name,
      level: level,
      code: menu.code,
      menuName: menu.menuName,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface ITreeMenu {
  name: string;
  actions: ITreeMenu[];
  code?: string;
  menuName?: string;
}
