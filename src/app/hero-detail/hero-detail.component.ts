import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    // snapshot toma una imagen de la ruta despues de que el componente fue creado
    // paramMap agarra los parametros que tengas definidos en la url
    // transforma la ruta a numero
    const id = +this.activatedRoute.snapshot.paramMap.get('id');

    // llamamos al heroService para pedir la data

    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
    });
  }

  handleBack() {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => {
        this.handleBack();
      }
      );
  }

}
