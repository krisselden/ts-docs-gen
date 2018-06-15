import { Contracts } from "ts-extractor";
import { ApiCallable } from "../api-callable";
import { ReferenceRenderHandler } from "../../contracts/serialized-api-item";

export class ApiCall extends ApiCallable<Contracts.ApiCallDto> {
    public ToText(render: ReferenceRenderHandler = this.DefaultReferenceRenderer): string[] {
        return [
            `${this.CallableToString(render)};`
        ];
    }

    public ToHeadingText(): string {
        return `${this.CallableToSimpleString()}`;
    }
}
