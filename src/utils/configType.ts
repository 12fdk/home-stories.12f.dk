import type { AppStoreMetadata } from "./appStoreData";

export type TemplateConfig = {
    appStore?: AppStoreMetadata;
    name: string;
    seo: {
        title: string;
        description: string;
    };
    logo: string;
    theme: string;
    backgroundGrid: boolean;
    forceTheme: boolean;
    showThemeSwitch: boolean;
    googlePlayLink?: string | undefined;
    appStoreLink?: string | undefined;
    termsAndConditions: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    privacyPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    cookiesPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    footer: {
        links: {
            title: string;
            href: string;
        }[];
        legalLinks: {
            termsAndConditions: boolean;
            privacyPolicy: boolean;
            cookiesPolicy: boolean;
        };
        socials?: {
            facebook?: string | undefined;
            instagram?: string | undefined;
            twitter?: string | undefined;
        } | undefined;
    };
    topNavbar: {
        cta?: string | undefined;
        disableWidthAnimation?: boolean | undefined;
        links: {
            title: string;
            href: string;
        }[];
        hideGooglePlay?: boolean | undefined;
        hideAppStore?: boolean | undefined;
    };
    appBanner?: {
        id?: string | undefined;
        title: string;
        subtitle: string;
        screenshots: string[];
    } | undefined;
    home: {
        seo: {
            title: string;
            description: string;
        };
        header: {
            id?: string | undefined;
            headline: string;
            subtitle: string;
            headlineMark?: number[] | undefined;
            screenshots: string[];
            rewards?: string[] | undefined;
            usersDescription?: string | undefined;
            /** Figures for the hero budget rail. Must match the sample project
             *  shown in the screenshots — the rail is the app, not a claim. */
            sample?: {
                project: string;
                currency: string;
                budget: number;
                spent: number;
                /** Committed but not yet paid — the app calls this "potential". */
                potential: number;
            } | undefined;
        };
        /** Short, checkable facts. One line, mono, no marketing. */
        facts?: {
            label: string;
            value: string;
        }[] | undefined;
        testimonials?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                name: string;
                comment: string;
            }[];
        } | undefined;
        faq?: {
            id?: string | undefined;
            title: string;
            qa: {
                question: string;
                answer: string;
            }[];
        } | undefined;
        howItWorks?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            steps: {
                image: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        features?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                icon: string;
                /** Real app screenshot — shown instead of the icon where present. */
                screenshot?: string | undefined;
                /** Slide the screenshot up inside the card so the part that
                 *  matches the card's claim is the part on show, e.g. "-22%". */
                crop?: string | undefined;
                /** Mono label above the card title, e.g. "Budget". */
                label?: string | undefined;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        /** Secondary grid of everything the flagship four screens don't cover.
         *  Icon is a key into the inline SVG set in the capabilities component. */
        capabilities?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                icon: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
    };
}