import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

jest.mock('@prisma/client');

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should start the database connection on module init', async () => {
    await service.onModuleInit();

    expect(service.$connect).toBeCalled();
  });

  it('should stop the database connection on module exit', async () => {
    const events = {};

    const app = {
      close: jest.fn(),
    } as any;

    const onSpy = jest.spyOn(service, '$on').mockImplementation((...args) => {
      const [event, fn] = args;

      events[event] = fn;
    });

    await service.enableShutdownHooks(app);

    const eventName = onSpy.mock.calls[0][0];

    expect(eventName).toBe('beforeExit');

    const fn = events['beforeExit'];

    expect(fn).toBeTruthy();

    fn();

    expect(app.close).toBeCalled();
  });
});
