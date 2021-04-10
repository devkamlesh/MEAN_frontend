import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule
    ]
})

export class MaterialModule { }