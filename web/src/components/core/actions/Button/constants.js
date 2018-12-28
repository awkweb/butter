import Theme from '@/components/theme'

export default {
    ActiveColor: {
        Brand: Theme.Color.Gold2,
        Primary: Theme.Color.Blue2,
        Secondary: Theme.Color.Gray7,
        Success: Theme.Color.Green2,
        Error: Theme.Color.Red2,
        Dark: Theme.Color.Gray2,
    },
    Color: {
        Brand: Theme.Color.Gold3,
        Primary: Theme.Color.Blue3,
        Secondary: Theme.Color.Gray8,
        Success: Theme.Color.Green3,
        Error: Theme.Color.Red3,
        Dark: Theme.Color.Gray3,
    },
    HoverColor: {
        Brand: Theme.Color.Gold4,
        Primary: Theme.Color.Blue4,
        Secondary: Theme.Color.Gray9,
        Success: Theme.Color.Green4,
        Error: Theme.Color.Red4,
        Dark: Theme.Color.Gray4,
    },
    Padding: {
        Normal: [1, 2],
        Large: [1.5, 3],
    },
    Size: {
        Normal: 'normal',
        Large: 'large',
    },
    Target: {
        Blank: '_blank',
        Self: '_self',
    },
    TextColor: {
        Brand: Theme.Color.Gray1,
        Primary: Theme.Color.White,
        Secondary: Theme.Color.Gray1,
        Success: Theme.Color.White,
        Error: Theme.Color.White,
        Dark: Theme.Color.White,
    },
    TextSize: {
        Normal: '0.875rem',
        Large: '1rem',
    },
    Transition: {
        Default: 'all 300ms cubic-bezier(0.19, 1, 0.22, 1)',
    },
    Type: {
        Button: 'button',
        Input: 'input',
    },
    Weight: { Default: '500' },
}
