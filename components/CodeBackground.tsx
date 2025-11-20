import React from 'react';
import { motion } from 'framer-motion';

const CODE_SNIPPETS = [
  // TypeScript/React
  'const result = await fetch()',
  'interface Props { id: string }',
  'function calculate(x: number)',
  'import { useState } from "react"',
  'export default App',
  'try { await api.call() }',
  'class Service extends Base',
  'return <Component />',
  'const [state, setState] =',
  'async function getData()',
  
  // Android/Kotlin
  'class MainActivity : AppCompatActivity()',
  'fun onCreate(savedInstanceState: Bundle?)',
  'val viewModel by viewModels<VM>()',
  'suspend fun fetchData(): Result<T>',
  'LaunchedEffect(key) {',
  '@Composable fun Screen()',
  'implementation("androidx.core:core-ktx")',
  'sealed class State<out T>',
  'lifecycleScope.launch {',
  
  // Swift/iOS
  'func viewDidLoad() {',
  'struct ContentView: View {',
  'async let result = fetch()',
  '@State private var isLoading = false',
  'Task { await loadData() }',
  'import SwiftUI',
  'class ViewModel: ObservableObject',
  'extension String {',
  '.onAppear { loadData() }',
  
  // AWS/Cloud
  'aws s3 sync dist/ s3://bucket',
  'CloudFormation::Resource',
  'lambda.invoke({ FunctionName })',
  'const s3 = new AWS.S3()',
  'Type: AWS::Lambda::Function',
  'cloudfront.createInvalidation()',
  'Resources: S3Bucket',
  'iam:GetRole',
  
  // Humor
  '// TODO: fix later (narrator: he did not)',
  'git commit -m "fix stuff"',
  'console.log("why is this working?")',
  'sleep(1000) // TODO: find better solution',
  '// this should not work but it does 🤷',
  'catch (e) { /* pray */ }',
  'const magic = 42; // dont touch',
  '// I have no idea what this does',
  'if (true) { // always true lol',
  'rm -rf node_modules && npm install',
];

export const CodeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {Array.from({ length: 20 }).map((_, i) => {
        const randomSnippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        const randomDelay = Math.random() * 10;
        const randomDuration = 15 + Math.random() * 10;
        const randomX = Math.random() * 100;
        const randomSize = 0.7 + Math.random() * 0.6;
        
        return (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: '110vh', 
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute text-emerald-400/60 font-mono whitespace-nowrap"
            style={{ 
              fontSize: `${randomSize}rem`,
              left: `${randomX}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {randomSnippet}
          </motion.div>
        );
      })}
    </div>
  );
};
