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

    // Copy compiled logger
    await fs.cp(
      path.join(__dirname, '../dist'),
      path.join(nodeModulesPath, 'node_modules/@layers/secret'),
      { recursive: true }
    );

    console.log('Layer built successfully!');
  } catch (error) {
    console.error('Error building layer:', error);
    process.exit(1);
  }
}

buildLayer();