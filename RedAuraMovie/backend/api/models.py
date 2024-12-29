import datetime

from django.db import models
from django.utils import timezone

from django.templatetags.static import static
from django.core.validators import MinValueValidator
from multiselectfield import MultiSelectField
from django.utils.text import slugify

GENRE_CHOICES = [
    ("Comedy", "Комедии"),
    ("Cartoons", "Мультфильмы"),
    ("Horror", "Ужасы"),
    ("Fantastic", "Фантастика"),
    ("Thrillers", "Триллеры"),
    ("Fighters", "Боевики"),
    ("Melodramas", "Мелодрамы"),
    ("Detectives", "Детективы"),
    ("Adventures", "Приключения"),
    ("Fantasy", "Фэнтези"),
    ("Military", "Военные"),
    ("Family", "Семейные"),
    ("Anime", "Аниме"),
    ("Historical", "Исторические"),
    ("Dramas", "Драмы"),
    ("Documentary", "Документальные"),
    ("Children's", "Детские"),
    ("Crime", "Криминал"),
    ("Biographies", "Биографии"),
    ("Westerns", "Вестерны"),
    ("Film Noir", "Фильмы-нуар"),
    ("Sports", "Спортивные"),
    ("Real TV", "Реальное ТВ"),
    ("Short films", "Короткометражки"),
    ("Musical", "Музыкальные"),
    ("Musicals", "Мюзиклы"),
    ("Talk show", "Ток-шоу"),
    ("Games", "Игры"),
]
    
GENRE_MAIN_CHOICES = [
    ("series", "Сериалы"),
    ("anime", "Аниме"),
    ("films", "Фильмы"),
]

class ModelVideo(models.Model):
    title_en = models.CharField(max_length=60)
    title_ru = models.CharField(max_length=60)
    season = models.IntegerField(validators=[MinValueValidator(0)])
    episode = models.IntegerField(validators=[MinValueValidator(0)])
    age = models.CharField(max_length=3)
    time = models.IntegerField(validators=[MinValueValidator(1)])
    date = models.IntegerField(validators=[MinValueValidator(1000)])
    description = models.CharField()
    main_genre = models.CharField(max_length=50, choices=GENRE_MAIN_CHOICES, default="series")
    genre = MultiSelectField(max_length=50, choices=GENRE_CHOICES, default="Comedy")

    slug = models.SlugField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title_en)
        super().save(*args, **kwargs)

    def get_image_path(self):
        return static(f"{self.main_genre.lower()}/{self.title_en.lower()}.jpg")