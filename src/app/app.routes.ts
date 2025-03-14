import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=> import('./components/home/home/home.component').then((c)=> c.HomeComponent),
    },
    {
        path:'create-worker',
        loadComponent:()=> import('./components/worker/create-worker/create-worker.component').then((c)=> c.CreateWorkerComponent),
    },
    {
        path:'create-earning',
        loadComponent:()=> import('./components/earning/create-earning/create-earning.component').then((c)=> c.CreateEarningComponent),
    },
    {
        path:'workers',
        loadComponent:()=> import('./components/worker/list-worker/list-worker.component').then((c)=> c.ListWorkerComponent),
    },
    {
        path:'earnings',
        loadComponent:()=> import('./components/earning/list-earning/list-earning.component').then((c)=> c.ListEarningComponent),
    }
];
