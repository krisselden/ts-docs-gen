import { Contracts } from "ts-extractor";

import { ApiDefinitionWithType } from "../api-definition-with-type";
import { ReferenceRenderHandler } from "../../contracts/serialized-api-item";

export class ApiProperty extends ApiDefinitionWithType<Contracts.ApiPropertyDto> {
    public ToText(render: ReferenceRenderHandler = this.DefaultReferenceRenderer): string[] {
        const optional = this.ApiItem.IsOptional ? "?" : "";
        const readOnly = this.ApiItem.IsReadonly ? "readonly " : "";
        const type = this.SerializedTypeToString(render, this.Type);

        return [`${readOnly}${this.Name}${optional}: ${type};`];
    }

    public ToHeadingText(): string {
        return this.Name;
    }
}
