#!/usr/bin/env node
import * as path from "path";

import { ArgsHandler, CliArguments } from "./arguments";
import { Logger, LoggerHelpers } from "../utils/logger";
import { GeneratorConfigurationBuilder } from "../builders/generator-configuration-builder";
import { GeneratorHelpers } from "../generator-helpers";
import { Generator } from "../generator";
import { Helpers } from "../utils/helpers";

(async ({ _, $0, project, plugin, output, entryFile, verbosity, dryRun, ...rest }: CliArguments) => {
    const builder = new GeneratorConfigurationBuilder(project);

    // Verbosity level.
    const verbosityLogLevel = verbosity != null ? LoggerHelpers.ParseLogLevelKey(verbosity) : undefined;
    if (verbosityLogLevel != null) {
        LoggerHelpers.SetLogLevel(verbosityLogLevel);
    }

    // Plugins
    if (plugin != null) {
        for (const pluginName of plugin) {
            // Resolve module location
            let moduleLocation: string;
            if (Helpers.IsPackageName(pluginName)) {
                moduleLocation = pluginName;
            } else {
                moduleLocation = path.resolve(process.cwd(), pluginName);
            }

            try {
                const plugins = await GeneratorHelpers.ResolvePlugin(moduleLocation);
                Logger.Debug(`${moduleLocation}: Resolved ${plugins.length} plugins.`);
                builder.AddPlugins(plugins);
            } catch (error) {
                Logger.Error(`${moduleLocation}: Error while proccessing plugins.`, error);
            }
        }
    }

    // Output
    if (output != null) {
        builder.SetOutputDirectory(output);
    }

    // Set rest of configuration
    builder.OverrideConfiguration({
        ...rest,
        verbosity: verbosityLogLevel
    });

    const generator = new Generator(await builder.Build(entryFile));
    if (dryRun) {
        Logger.Debug(generator.OutputData);
    } else {
        await generator.WriteToFiles();
    }
})(ArgsHandler);
