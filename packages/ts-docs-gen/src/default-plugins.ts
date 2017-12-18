import { ApiVariablePlugin } from "./plugins/api-variable-plugin";
import { ApiEnumPlugin } from "./plugins/api-enum-plugin";
import { ApiTypePlugin } from "./plugins/api-type-plugin";
import { ApiNamespacePlugin } from "./plugins/api-namespace-plugin";

export const DefaultPlugins = [
    new ApiVariablePlugin(),
    new ApiEnumPlugin(),
    new ApiTypePlugin(),
    new ApiNamespacePlugin()
];
