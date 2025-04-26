import React, { useState } from 'react';
import { FlaskRound as Flask, ArrowRight, RefreshCw, AlertCircle, Microscope, Atom } from 'lucide-react';

interface FormData {
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
}

interface ApiError {
  message: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    feature1: '',
    feature2: '',
    feature3: '',
    feature4: '',
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const features = [
        parseFloat(formData.feature1),
        parseFloat(formData.feature2),
        parseFloat(formData.feature3),
        parseFloat(formData.feature4)
      ];

      if (features.some(isNaN)) {
        throw new Error('All features must be valid numbers');
      }

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.message || 'Failed to get prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#040B14] p-6"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(91, 180, 240, 0.1) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, rgba(91, 180, 240, 0.1) 0%, transparent 20%),
          radial-gradient(circle at 50% 50%, rgba(91, 180, 240, 0.05) 0%, transparent 50%)
        `
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-[#040B14] rounded-2xl shadow-2xl border border-blue-900/30 p-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Microscope className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  AI-Driven Drug Discovery
                </h1>
                <p className="text-blue-300/80 text-sm">
                  Molecular Feature Analysis Model
                </p>
              </div>
            </div>

            {/* Main content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form section */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                    <Atom className="w-5 h-5 text-blue-400" />
                    Molecular Features
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num}>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Feature {num}
                        </label>
                        <input
                          type="number"
                          step="any"
                          name={`feature${num}`}
                          value={formData[`feature${num}` as keyof FormData]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 text-gray-100 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600
                                   transition-colors"
                          placeholder="Enter numerical value"
                          required
                        />
                      </div>
                    ))}

                    {error && (
                      <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-lg
                               hover:from-blue-700 hover:to-cyan-600 transition-all duration-300
                               disabled:opacity-50 disabled:cursor-not-allowed
                               shadow-lg shadow-blue-500/20 font-medium"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Predict Outcome
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Results section */}
              <div className="space-y-6">
                {prediction !== null && (
                  <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl p-6 border border-blue-800/30">
                    <h2 className="text-lg font-semibold text-white mb-4">Analysis Results</h2>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Prediction Score</p>
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                          {prediction.toFixed(4)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">
                      This score represents the model's prediction based on the molecular features provided.
                      Higher values indicate stronger potential for drug-like properties.
                    </p>
                  </div>
                )}

                <div className="bg-blue-950/20 rounded-xl p-6 border border-blue-900/30">
                  <h3 className="text-sm font-semibold text-blue-300 mb-2">About This Model</h3>
                  <p className="text-sm text-gray-400">
                    This AI model analyzes molecular features to predict drug-like properties and potential therapeutic value.
                    Input the required molecular descriptors to receive a prediction score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;