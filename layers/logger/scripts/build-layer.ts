import fs from 'fs/promises';
import * as path from 'path';
import { execSync } from 'child_process';

async function buildLayer() {
  try {
    const layerDir = path.join(__dirname, '../layer');
    const nodeModulesPath = path.join(layerDir, 'nodejs');

    // Clean previous build
    try {
      await fs.rm(layerDir, { recursive: true, force: true });
    } catch (error: any) {
      if (error.code !== 'ENOENT') throw error;
    }

    // Create layer structure
    await fs.mkdir(nodeModulesPath, { recursive: true });

    // Create a package.json for the layer
    await fs.writeFile(
      path.join(nodeModulesPath, 'package.json'),
      JSON.stringify({
        name: 'lambda-layer',
        dependencies: {
          winston: '^3.11.0'  // specify the version you need
        }
      })
    );

    // Install dependencies
    execSync('npm install --production', {
      cwd: nodeModulesPath,
      stdio: 'inherit'
    });

    // Copy compiled logger
    await fs.cp(
      path.join(__dirname, '../dist'),
      path.join(nodeModulesPath, 'node_modules/@layers/logger'),
      { recursive: true }
    );

    console.log('Layer built successfully!');
  } catch (error) {
    console.error('Error building layer:', error);
    process.exit(1);
  }
}

buildLayer();