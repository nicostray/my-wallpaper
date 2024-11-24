import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  categories = [
    {
      name: 'Anime',
      image: 'assets/images/category/anime.jpg'
    },
    {
      name: 'Animales',
      image: 'assets/images/category/animales.png'
    },
    {
      name: 'Comida',
      image: 'assets/images/category/comida.png'
    },
    {
      name: 'Tecnologia',
      image: 'assets/images/category/tecnologia.png'
    },
    {
      name: 'Navidad',
      image: 'assets/images/category/navidad.png'
    },
  ]
}
