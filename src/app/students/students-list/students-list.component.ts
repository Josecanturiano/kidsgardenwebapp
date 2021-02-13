import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'twitter'];
  dataSource = new MatTableDataSource<any>([
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxlynch'
    },
    {
      first_name: 'Matt',
      last_name: 'Netkow',
      twitter: 'dotNetkow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benjsperry'
    },
    {
      first_name: 'Matt',
      last_name: 'Netkow',
      twitter: 'dotNetkow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benjsperry'
    },
    {
      first_name: 'Matt',
      last_name: 'Netkow',
      twitter: 'dotNetkow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benjsperry'
    }
  ]);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
