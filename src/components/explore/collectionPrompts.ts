
import { 
  BookOpen, Book as BookIcon, BookText, Star, Sparkles, 
  Layers, BookOpenCheck, Grid2x2, Library, LucideIcon
} from 'lucide-react';

// Define a type for our collection prompts
export interface CollectionPrompt {
  title: string;
  prompt: string;
  iconName: string;
  icon: LucideIcon;
}

// Enhanced list of prompts specifically targeted to Gutenberg's public domain books
export const ALL_COLLECTION_PROMPTS: CollectionPrompt[] = [
  {
    title: "Clasici literari",
    prompt: "10 cele mai renumite capodopere literare clasice de Jane Austen, Charles Dickens, Mark Twain și Fyodor Dostoyevsky disponibile în Project Gutenberg",
    iconName: "BookIcon",
    icon: BookIcon
  },
  {
    title: "Aventuri extraordinare",
    prompt: "10 cele mai bune romane de aventură de Jules Verne, Robert Louis Stevenson și Alexandre Dumas din biblioteca Gutenberg",
    iconName: "BookOpen",
    icon: BookOpen
  },
  {
    title: "Romane victoriene",
    prompt: "10 romane esențiale victoriene de Charles Dickens, Jane Austen, Charlotte Brontë și George Eliot din Gutenberg",
    iconName: "BookText",
    icon: BookText
  },
  {
    title: "Povești de dragoste",
    prompt: "10 cele mai apreciate romane de dragoste clasice de Jane Austen, Emily Brontë și Elizabeth Gaskell din Gutenberg",
    iconName: "Star",
    icon: Star
  },
  {
    title: "Opere filozofice",
    prompt: "10 cele mai importante lucrări filozofice clasice de Platon, Aristotel, Nietzsche și Kant din Gutenberg",
    iconName: "Sparkles",
    icon: Sparkles
  },
  {
    title: "Mitologie și legende",
    prompt: "10 cele mai importante cărți despre mitologie și legende din colecția Gutenberg, incluzând Homer și Ovidiu",
    iconName: "Layers",
    icon: Layers
  },
  {
    title: "Opere Shakespeare",
    prompt: "10 cele mai renumite piese de teatru de William Shakespeare disponibile în Gutenberg",
    iconName: "BookOpenCheck",
    icon: BookOpenCheck
  },
  {
    title: "Poezie clasică",
    prompt: "10 cele mai importante colecții de poezie de Walt Whitman, Emily Dickinson, John Keats și Lord Byron din Gutenberg",
    iconName: "Star",
    icon: Star
  },
  {
    title: "Autori americani",
    prompt: "10 cele mai importante opere ale literaturii americane clasice de Mark Twain, Herman Melville, Edgar Allan Poe și Jack London din Gutenberg",
    iconName: "BookText",
    icon: BookText
  },
  {
    title: "Biografii celebre",
    prompt: "10 cele mai importante autobiografii și biografii din Gutenberg, inclusiv Benjamin Franklin și Plutarh",
    iconName: "BookOpen",
    icon: BookOpen
  },
  {
    title: "Mistere și detectivi",
    prompt: "10 cele mai bune romane polițiste și de mister de Arthur Conan Doyle, Edgar Allan Poe și Wilkie Collins din Gutenberg",
    iconName: "Grid2x2",
    icon: Grid2x2
  },
  {
    title: "Științe și explorare",
    prompt: "10 cărți clasice despre știință și explorare de Charles Darwin și Alexander von Humboldt din Gutenberg",
    iconName: "Layers",
    icon: Layers
  },
  {
    title: "Pionieri sci-fi",
    prompt: "10 romane science fiction pioniere de H.G. Wells, Jules Verne și Mary Shelley din Gutenberg",
    iconName: "BookOpenCheck",
    icon: BookOpenCheck
  },
  {
    title: "Clasici ruși",
    prompt: "10 cele mai importante opere ale literaturii ruse de Dostoievski, Tolstoi, Cehov și Gogol din Gutenberg",
    iconName: "Library",
    icon: Library
  },
  {
    title: "Călătorii",
    prompt: "10 cele mai faimoase cărți despre călătorii și explorări din Gutenberg precum Robinson Crusoe și Călătoriile lui Gulliver",
    iconName: "BookIcon",
    icon: BookIcon
  },
  {
    title: "Cărți pentru copii",
    prompt: "10 cele mai populare cărți clasice pentru copii de Lewis Carroll, L. Frank Baum, Brothers Grimm și Hans Christian Andersen din Gutenberg",
    iconName: "BookText",
    icon: BookText
  },
  {
    title: "Filozofie antică",
    prompt: "10 cele mai importante texte filozofice antice de Platon, Aristotel, Epictet și Marcus Aurelius din Gutenberg",
    iconName: "Sparkles",
    icon: Sparkles
  },
  {
    title: "Povești gotice",
    prompt: "10 cele mai cunoscute romane gotice și de groază de Mary Shelley, Bram Stoker și Edgar Allan Poe din Gutenberg",
    iconName: "BookOpen",
    icon: BookOpen
  }
];
