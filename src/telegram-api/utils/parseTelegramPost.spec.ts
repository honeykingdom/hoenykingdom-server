import path from 'path';
import * as fs from 'fs';
import parseTelegramPost from './parseTelegramPost';

const readFile = (filename: string) =>
  fs.promises.readFile(
    path.resolve('./src/telegram-api/mocks', filename),
    'utf8',
  );

describe('parseTelegramMessage', () => {
  it('should return null with empty args', async () => {
    expect(parseTelegramPost('')).toEqual({
      type: 'not-found',
      post: null,
    });
  });

  it('should parse "post not found"', async () => {
    expect(parseTelegramPost(await readFile('post-not-found.html'))).toEqual({
      type: 'not-found',
      post: null,
    });
  });

  it('should parse text post', async () => {
    expect(parseTelegramPost(await readFile('text-only.html'))).toEqual({
      type: 'post',
      post: {
        id: 40973,
        channel: { id: 1036240821, name: 'meduzalive', title: 'Медуза — LIVE' },
        date: 1618072032000,
        link: 'https://t.me/meduzalive/40973',
        bodyText:
          'Похороны супруга королевы Елизаветы II, герцога Эдинбургского Филиппа состоятся в Виндзоре 17 апреля. Из-за пандемии коронавируса количество участников церемонии будет ограничено. Помимо носильщиков гроба и архиепископа Кентерберийского, на похоронах будут присутствовать 30 человек. Среди них будет принц Гарри, который прилетит на похороны из США. https://mdza.io/KIvp8C9R7Kg',
        media: [],
      },
    });

    expect(parseTelegramPost(await readFile('text-only-2.html'))).toEqual({
      type: 'post',
      post: {
        id: 40988,
        channel: { id: 1036240821, name: 'meduzalive', title: 'Медуза — LIVE' },
        date: 1618140378000,
        link: 'https://t.me/meduzalive/40988',
        bodyText:
          'Ожидание: красиво уходишь от погони Реальность: жаришь курицу https://mdza.io/xMT5Sg1Sfss',
        media: [],
      },
    });
  });

  it('should parse service message', async () => {
    expect(parseTelegramPost(await readFile('service-message.html'))).toEqual({
      type: 'service-message',
      post: null,
    });
  });

  it('should parse repost', async () => {
    expect(parseTelegramPost(await readFile('repost.html'))).toEqual({
      type: 'post',
      post: {
        id: 40984,
        channel: { id: 1036240821, name: 'meduzalive', title: 'Медуза — LIVE' },
        forwardedFrom: {
          channelName: 'stopcoronavirusrussia',
          channelTitle: 'СТОПКОРОНАВИРУС.РФ',
          postId: 4268,
        },
        date: 1618129234000,
        link: 'https://t.me/meduzalive/40984',
        bodyText:
          'За последние сутки в России выявлено 8 702 случая COVID-19 в 84 регионах, из них 1 133 (13,0%) — активно у контактных лиц без клинических проявлений болезни ❗️ Всего в стране нарастающим итогом выявлено 4 641 390 человек в 85 регионах. Также за сутки зафиксировано 337 летальных исходов. За весь период в России от коронавируса скончалось 102 986 человек. Записаться на вакцинацию можно по ссылке. #стопкоронавирус #здоровьевприоритете #coronavirus',
        media: [{ type: 'image' }],
      },
    });
  });

  it('should parse reply', async () => {
    expect(parseTelegramPost(await readFile('reply.html'))).toEqual({
      type: 'post',
      post: {
        id: 40957,
        channel: { id: 1036240821, name: 'meduzalive', title: 'Медуза — LIVE' },
        replyTo: {
          postId: 40953,
          channelName: 'meduzalive',
          channelTitle: 'Медуза — LIVE',
          bodyText:
            '«Важные истории» уточнили, что обыск у главреда издания Романа Анина проходил по делу о нарушении неприкосновенности частной жизни, совершенном лицом с использованием своего служебного положения (часть 2 статьи 137). В каком статусе находится Анин, пока неясно.',
        },
        date: 1617993506000,
        link: 'https://t.me/meduzalive/40957',
        bodyText:
          'Обыск у главного редактора «Важных историй» Романа Анина продолжается уже пятый час подряд, сообщает журналист Алеся Мароховская.',
        media: [],
      },
    });
  });

  it('should parse post with one image', async () => {
    expect(parseTelegramPost(await readFile('one-image.html'))).toEqual({
      type: 'post',
      post: {
        id: 40978,
        channel: { id: 1036240821, name: 'meduzalive', title: 'Медуза — LIVE' },
        date: 1618076439000,
        link: 'https://t.me/meduzalive/40978',
        bodyText:
          'Во Франции аномальные холода, пришедшие в 10 из 13 регионов страны, уничтожили значительную часть будущего урожая винограда. В начале апреля по ночам в некоторых провинциях температура опускалась до минус восьми градусов по Цельсию; многие фермеры пытались согреть виноградники, зажигая свечи на участках. Из-за заморозков сборы винограда могут стать наименьшими за последние 40 лет, также ожидаются неурожаи яблок, абрикосов и других теплолюбивых культур. Власти Франции объявили режим чрезвычайной ситуации в сельском хозяйстве и задействовали механизм выплат компенсаций фермерам из специального фонда.',
        media: [{ type: 'image' }],
      },
    });
  });

  it('should parse post with many images', async () => {
    expect(parseTelegramPost(await readFile('many-images.html'))).toEqual({
      type: 'post',
      post: {
        id: 42166,
        channel: { id: 1005031786, name: 'tvrain', title: 'Телеканал Дождь' },
        date: 1617980425000,
        link: 'https://t.me/tvrain/42166',
        bodyText:
          'Сегодня умер принц Филипп — муж королевы Елизаветы II. Через два месяца ему должно было исполниться 100 лет. В браке с королевой они прожили 73 года. Вспоминаем долгую и яркую жизнь принца. Больше фото — в галерее Дождя Фото: PA Wire / TASS; PA Images / TASS; Роман Денисов / ТАСС; Toby Melville / PA Wire / TASS; Adrian Dennis / AP; Alastair Grant / AP',
        media: [
          { type: 'image' },
          { type: 'image' },
          { type: 'image' },
          { type: 'image' },
          { type: 'image' },
          { type: 'image' },
          { type: 'image' },
        ],
      },
    });
  });

  it('should parse post with one video', async () => {
    expect(parseTelegramPost(await readFile('one-video.html'))).toEqual({
      type: 'post',
      post: {
        id: 42161,
        channel: { id: 1005031786, name: 'tvrain', title: 'Телеканал Дождь' },
        date: 1617973254000,
        link: 'https://t.me/tvrain/42161',
        bodyText:
          'На основателя «Артдокфеста» Виталия Манского напали активисты группы SERB. Пока режиссер давал интервью журналистам, к нему подбежали неизвестные, один из них попытался перехватить ему горло тканью Видео: Дождь',
        media: [{ type: 'video' }],
      },
    });
  });

  it('should parse post with many videos', async () => {
    expect(parseTelegramPost(await readFile('many-videos.html'))).toEqual({
      type: 'post',
      post: {
        id: 42053,
        channel: { id: 1005031786, name: 'tvrain', title: 'Телеканал Дождь' },
        date: 1617797690000,
        link: 'https://t.me/tvrain/42053',
        bodyText:
          'Из Мосгорсуда эвакуируют людей. Сегодня там должны проходить заседания по «санитарному делу» Видео: Василий Крестьянинов; телеграм-канал «Меркури»',
        media: [{ type: 'video' }, { type: 'video' }, { type: 'video' }],
      },
    });
  });

  it('should parse post with images and videos', async () => {
    expect(parseTelegramPost(await readFile('videos-and-images.html'))).toEqual(
      {
        type: 'post',
        post: {
          id: 2252,
          channel: {
            id: 1259564118,
            name: 'streaminside',
            title: 'STREAM INSIDE',
          },
          date: 1618133581000,
          link: 'https://t.me/streaminside/2252',
          bodyText:
            "👀 Моргенштерн встретился с «кумиром всей своей жизни» — #Valakas'ом",
          media: [{ type: 'image' }, { type: 'video' }],
        },
      },
    );
  });
});
