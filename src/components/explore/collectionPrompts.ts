
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
    title: "Capodopere literare universale",
    prompt: "cele mai importante 15 capodopere literare universale disponibile în Project Gutenberg de Jane Austen, Charles Dickens, Mark Twain, Fyodor Dostoyevsky, Leo Tolstoy, și Victor Hugo",
    iconName: "BookIcon",
    icon: BookIcon
  },
  {
    title: "Aventuri extraordinare",
    prompt: "15 romane clasice de aventură din Gutenberg de Jules Verne, H.G. Wells, Robert Louis Stevenson și Alexandre Dumas",
    iconName: "BookOpen",
    icon: BookOpen
  },
  {
    title: "Esențiale Literatura Victoriană",
    prompt: "15 cărți esențiale din perioada victoriană de Charles Dickens, Jane Austen, Charlotte Brontë, William Makepeace Thackeray și George Eliot",
    iconName: "BookText",
    icon: BookText
  },
  {
    title: "Romane de dragoste clasice",
    prompt: "15 cele mai frumoase romane de dragoste clasice din Gutenberg de Jane Austen, Charlotte Brontë, Emily Brontë și Elizabeth Gaskell",
    iconName: "Star",
    icon: Star
  },
  {
    title: "Filosofie fundamentală",
    prompt: "15 lucrări fundamentale de filosofie din Gutenberg de Platon, Aristotel, Kant, Nietzsche, John Stuart Mill și Seneca",
    iconName: "Sparkles",
    icon: Sparkles
  },
  {
    title: "Mitologie și legende",
    prompt: "15 cărți clasice despre mitologie și legende din Gutenberg, incluzând Homer, Virgil, Ovidiu și Thomas Bulfinch",
    iconName: "Layers",
    icon: Layers
  },
  {
    title: "Shakespeare și teatru clasic",
    prompt: "15 cele mai importante opere dramatice de William Shakespeare în Gutenberg",
    iconName: "BookOpenCheck",
    icon: BookOpenCheck
  },
  {
    title: "Poezie clasică de referință",
    prompt: "15 cele mai importante colecții de poezii clasice din Gutenberg, de Walt Whitman, Emily Dickinson, John Keats, Lord Byron și William Wordsworth",
    iconName: "Star",
    icon: Star
  },
  {
    title: "Clasici americani",
    prompt: "15 romane americane clasice din Gutenberg de Mark Twain, Herman Melville, Nathaniel Hawthorne, Jack London și Edgar Allan Poe",
    iconName: "BookText",
    icon: BookText
  },
  {
    title: "Mari biografii și memorii",
    prompt: "15 biografii și autobiografii clasice din Gutenberg precum Autobiografia lui Benjamin Franklin, Viețile lui Plutarh și Memoriile generalului Grant",
    iconName: "BookOpen",
    icon: BookOpen
  },
  {
    title: "Mistere și romane polițiste",
    prompt: "15 cărți clasice de detectivi și mister din Gutenberg de Arthur Conan Doyle, Wilkie Collins, Edgar Allan Poe și Gaston Leroux",
    iconName: "Grid2x2",
    icon: Grid2x2
  },
  {
    title: "Științe și explorare",
    prompt: "15 cărți clasice despre știință și explorare din Gutenberg de Charles Darwin, Alexander von Humboldt, și Thomas Henry Huxley",
    iconName: "Layers",
    icon: Layers
  },
  {
    title: "Science Fiction pionier",
    prompt: "15 romane science fiction clasice din Gutenberg de H.G. Wells, Jules Verne, Mary Shelley și Edward Bellamy",
    iconName: "BookOpenCheck",
    icon: BookOpenCheck
  },
  {
    title: "Clasici ruși fundamentali",
    prompt: "15 opere esențiale din literatura rusă clasică din Gutenberg de Dostoievski, Tolstoi, Cehov, Gogol și Turgenev",
    iconName: "Library",
    icon: Library
  },
  {
    title: "Călătorii și explorări",
    prompt: "15 cărți clasice despre explorări și călătorii din Gutenberg precum Robinson Crusoe, Călătoriile lui Gulliver, și jurnalele căpitanului Cook",
    iconName: "BookIcon",
    icon: BookIcon
  },
  {
    title: "Literatura pentru copii",
    prompt: "15 cărți clasice pentru copii din Gutenberg de Lewis Carroll, L. Frank Baum, Brothers Grimm, Hans Christian Andersen și Carlo Collodi",
    iconName: "BookText",
    icon: BookText
  },
  {
    title: "Opere filosofice antice",
    prompt: "15 opere filosofice antice din Gutenberg de Platon, Aristotel, Epictet, Seneca, Marcus Aurelius și Lucretius",
    iconName: "Sparkles",
    icon: Sparkles
  },
  {
    title: "Romane gotice și de groază",
    prompt: "15 romane gotice și de groază clasice din Gutenberg de Mary Shelley, Bram Stoker, Edgar Allan Poe, Ann Radcliffe și Matthew Gregory Lewis",
    iconName: "BookOpen",
    icon: BookOpen
  }
];
