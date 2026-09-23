/**
 * Plantora AI - ML Model Registry and Formats
 * 
 * Supports .h5, .keras, .tflite, and SavedModel formats.
 * Provides unified crop disease classification classes and metadata.
 */

export interface ModelMetadata {
  name: string;
  version: string;
  format: 'h5' | 'keras' | 'tflite' | 'saved_model' | 'fallback_engine';
  inputShape: [number, number, number];
  numClasses: number;
  classes: string[];
  loadedAt?: string;
  isDemoMode: boolean;
  modelPath?: string;
}

export const SUPPORTED_CROPS = [
  'Tomato',
  'Rice',
  'Maize',
  'Potato',
  'Wheat',
  'Sugarcane',
  'Cotton',
  'Chilli',
  'Grape',
  'Apple'
] as const;

export type SupportedCrop = typeof SUPPORTED_CROPS[number];

export const CROP_DISEASE_CLASSES: Record<string, {
  crop: SupportedCrop;
  disease: string;
  scientificName: string;
  commonSymptoms: string[];
  organicRemedy: string;
  culturalRemedy: string;
  chemicalGuidance: string;
  severityDefault: 'Low' | 'Moderate' | 'High';
}> = {
  'tomato_early_blight': {
    crop: 'Tomato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    commonSymptoms: ['Concentric dark brown rings on older leaves', 'Yellow halo surrounding lesions', 'Premature leaf drop'],
    organicRemedy: 'Apply copper-based fungicides or bio-fungicide containing Bacillus subtilis during early morning.',
    culturalRemedy: 'Prune bottom leaves to ensure 30cm clearance from soil. Avoid overhead irrigation and use mulch to prevent soil splash.',
    chemicalGuidance: 'Follow local agricultural authority guidelines and product label for Chlorothalonil or Mancozeb application.',
    severityDefault: 'Moderate'
  },
  'tomato_late_blight': {
    crop: 'Tomato',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    commonSymptoms: ['Water-soaked dark lesions on leaf tips and stems', 'White fungal growth on leaf undersides in humid conditions', 'Rapid plant collapse'],
    organicRemedy: 'Apply preventative copper hydroxide spray before prolonged rain. Remove and safely destroy heavily infected plants.',
    culturalRemedy: 'Ensure wide plant spacing for aeration, avoid wetting foliage, and remove volunteer solanaceous weeds.',
    chemicalGuidance: 'Consult extension officer recommendations for Cymoxanil or Metalaxyl-M formulated fungicides.',
    severityDefault: 'High'
  },
  'tomato_healthy': {
    crop: 'Tomato',
    disease: 'Healthy Crop (No Disease Detected)',
    scientificName: 'Solanum lycopersicum (Vigorous)',
    commonSymptoms: ['Vibrant green leaves', 'Consistent leaf margin', 'No necrotic spots or chlorosis'],
    organicRemedy: 'Maintain balanced vermicompost and neem oil prophylactic spray every 14 days.',
    culturalRemedy: 'Continue standard drip irrigation schedule and regular staking.',
    chemicalGuidance: 'No chemical intervention needed.',
    severityDefault: 'Low'
  },
  'rice_blast': {
    crop: 'Rice',
    disease: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    commonSymptoms: ['Spindle-shaped lesions with gray/white centers and dark borders', 'Neck rot on panicles', 'Stunted grain filling'],
    organicRemedy: 'Foliar spray of Pseudomonas fluorescens (10g/L) at nursery and tillering stage.',
    culturalRemedy: 'Avoid excessive nitrogen fertilization, split urea applications, and avoid deep stagnant standing water.',
    chemicalGuidance: 'Apply Tricyclazole or Isoprothiolane at panicle emergence as per local agriculture advisory.',
    severityDefault: 'High'
  },
  'rice_brown_spot': {
    crop: 'Rice',
    disease: 'Brown Spot',
    scientificName: 'Bipolaris oryzae',
    commonSymptoms: ['Small, round oval brown spots evenly distributed on leaf blade', 'Gray necrotic center with yellow halo'],
    organicRemedy: 'Seed treatment with Trichoderma viride and foliar zinc sulfate application.',
    culturalRemedy: 'Rectify soil nutrient deficiencies (potassium and silicon), maintain proper field leveling.',
    chemicalGuidance: 'Apply Mancozeb or Propiconazole as recommended by state agricultural extension.',
    severityDefault: 'Moderate'
  },
  'potato_late_blight': {
    crop: 'Potato',
    disease: 'Potato Late Blight',
    scientificName: 'Phytophthora infestans',
    commonSymptoms: ['Dark brown irregular lesions with pale green borders', 'Tuber rotting with dry brownish granular rot'],
    organicRemedy: 'Bordeaux mixture spray (1%) upon weather advisory warning.',
    culturalRemedy: 'High ridging of soil to protect tubers, certified seed tuber usage, destruction of cull piles.',
    chemicalGuidance: 'Apply systemic fungicides (Dimethomorph / Fenamidone) under strict agronomic advisory.',
    severityDefault: 'High'
  },
  'maize_fall_armyworm': {
    crop: 'Maize',
    disease: 'Fall Armyworm Damage',
    scientificName: 'Spodoptera frugiperda',
    commonSymptoms: ['Window-pane feeding marks on leaf whorl', 'Extensive frass (sawdust-like excrement)', 'Damaged tassel and cob'],
    organicRemedy: 'Apply Bacillus thuringiensis (Bt kurstaki) or Metarhizium anisopliae or Neem seed kernel extract (NSKE 5%).',
    culturalRemedy: 'Install pheromone traps (5/acre), intercrop with desmodium or cowpea (push-pull strategy).',
    chemicalGuidance: 'Apply Emamectin Benzoate 5% SG or Chlorantraniliprole into leaf whorls as directed by regional authorities.',
    severityDefault: 'High'
  },
  'maize_leaf_spot': {
    crop: 'Maize',
    disease: 'Maydis Leaf Blight / Leaf Spot',
    scientificName: 'Bipolaris maydis',
    commonSymptoms: ['Elongated rectangular grayish-tan lesions between leaf veins', 'Premature blighting of foliage'],
    organicRemedy: 'Bio-fungicide spray containing Trichoderma harzianum.',
    culturalRemedy: 'Crop rotation with non-host legumes, crop residue incorporation after harvest.',
    chemicalGuidance: 'Apply Azoxystrobin or Mancozeb as per state university package of practices.',
    severityDefault: 'Moderate'
  },
  'wheat_rust': {
    crop: 'Wheat',
    disease: 'Stripe / Yellow Rust',
    scientificName: 'Puccinia striiformis',
    commonSymptoms: ['Bright yellow pustules arranged in linear stripes on leaves', 'Yellow powdery spores upon touch'],
    organicRemedy: 'Grow resistant cultivars recommended for the agro-climatic zone.',
    culturalRemedy: 'Timely sowing, balanced N:P:K fertilization, avoid excess irrigation in cool foggy periods.',
    chemicalGuidance: 'Single spray of Tebuconazole or Propiconazole upon initial symptom detection.',
    severityDefault: 'High'
  },
  'sugarcane_red_rot': {
    crop: 'Sugarcane',
    disease: 'Red Rot',
    scientificName: 'Colletotrichum falcatum',
    commonSymptoms: ['Discoloration of third/fourth leaf with yellowing', 'Internal stalk tissue shows red color with white cross patches', 'Alcoholic smell when split open'],
    organicRemedy: 'Sett treatment with Trichoderma viride culture (10g/L) for 30 minutes before planting.',
    culturalRemedy: 'Use tissue-cultured disease-free setts, practice 3-year crop rotation with paddy/green manure.',
    chemicalGuidance: 'Sett dip in Carbendazim solution prior to planting under certified supervision.',
    severityDefault: 'High'
  }
};
