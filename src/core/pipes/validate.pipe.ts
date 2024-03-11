import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        console.log(`e: `, e.message);
        throw new UnprocessableEntityException(
          // @ts-expect-error temp
          this.handleError(e.message.message),
        );
      }
    }
  }

  private handleError(errors) {
    console.log(`Inside handelErrors `, errors);
    return errors.map((error) => error.constraints);
  }
}
