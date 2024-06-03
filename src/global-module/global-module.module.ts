import { Global, Module } from '@nestjs/common';
import { ResponseService } from 'src/utils/json-response.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [ResponseService],
    exports: [ResponseService]
})
export class GlobalModuleModule {}
