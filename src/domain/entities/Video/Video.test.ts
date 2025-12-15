import { Video } from './Video';
import { Genre } from './Genre';
import {
  wronUUIDFormat,
  invalidVideoType,
} from '../../../utils/globals/errorMessages';

describe('video entity test', () => {
  it('Pass new Video creation when id and video type are valid', () => {
    const video = new Video(
      '38f7c85c-c40e-473c-9cb1-e43c80771242',
      'The fellowship of the ring',
      'A movie based on the lord of the rings trilogy by J.R.R Tolkien',
      true,
      12,
      '/the-fellowship-of-the-ring.mp4',
      '2:00:00',
      'video/mp4',
      Genre.FANTASY,
    );
    expect(video).toBeInstanceOf(Video);
  });

  it('Should throw error when id is invalid', () => {
    expect(
      () =>
        new Video(
          '38f7c85c-c40e-473c-9cb1-e43c80771',
          'The fellowship of the ring',
          'A movie based on the lord of the rings trilogy by J.R.R Tolkien',
          true,
          12,
          '/the-fellowship-of-the-ring.mp4',
          '2:00:00',
          'video/mp4',
          Genre.FANTASY,
        ),
    ).toThrow(new Error(wronUUIDFormat));
  });

  it('Should throw error when video type is invalid', () => {
    const videoType = 'video.mov';
    expect(
      () =>
        new Video(
          '38f7c85c-c40e-473c-9cb1-e43c80771242',
          'The fellowship of the ring',
          'A movie based on the lord of the rings trilogy by J.R.R Tolkien',
          true,
          12,
          '/the-fellowship-of-the-ring.mp4',
          '2:00:00',
          videoType,
          Genre.FANTASY,
        ),
    ).toThrow(new Error(`${videoType} ${invalidVideoType}`));
  });
});
