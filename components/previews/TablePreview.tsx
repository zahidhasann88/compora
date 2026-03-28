import { usePlaygroundStore, type Styles, type Variant } from '@/store/usePlaygroundStore';
import { CSSProperties } from 'react';

function getTableStyles(styles: Styles, variant: Variant, theme: 'light' | 'dark'): CSSProperties {
  return {
    borderRadius: `${styles.borderRadius}px`,
    width: '100%',
    maxWidth: '600px',
    border: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}`,
    overflow: 'hidden',
  };
}

export function TablePreview() {
  const { styles, variant, theme, componentProps } = usePlaygroundStore();
  const props = componentProps['table'] || {};
  const isWhiteText = styles.textColor.toLowerCase() === '#ffffff';

  const isStriped = props.striped ?? true;
  const rootStyles = getTableStyles(styles, variant, theme);
  const stripeColor = theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
  
  return (
    <div style={rootStyles} className="animate-fade-in">
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
        <thead style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}` }}>
          <tr>
            <th style={{ padding: '12px 16px', fontWeight: 500, color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Invoice</th>
            <th style={{ padding: '12px 16px', fontWeight: 500, color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Status</th>
            <th style={{ padding: '12px 16px', fontWeight: 500, color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Method</th>
            <th style={{ padding: '12px 16px', fontWeight: 500, color: theme === 'dark' ? '#94a3b8' : '#64748b', textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody style={{ color: (isWhiteText && theme === 'light') ? '#0f172a' : styles.textColor }}>
          <tr style={{ borderBottom: `1px solid ${theme === 'dark' ? '#1e293b' : '#e2e8f0'}` }} className={props.hoverable ? "hover:bg-foreground/5 transition-colors" : ""}>
            <td style={{ padding: '16px', fontWeight: 500 }}>INV001</td>
            <td style={{ padding: '16px' }}>Paid</td>
            <td style={{ padding: '16px' }}>Credit Card</td>
            <td style={{ padding: '16px', textAlign: 'right' }}>$250.00</td>
          </tr>
          <tr style={{ backgroundColor: isStriped ? stripeColor : 'transparent' }} className={props.hoverable ? "hover:bg-foreground/5 transition-colors" : ""}>
            <td style={{ padding: '16px', fontWeight: 500 }}>INV002</td>
            <td style={{ padding: '16px' }}>Pending</td>
            <td style={{ padding: '16px' }}>PayPal</td>
            <td style={{ padding: '16px', textAlign: 'right' }}>$150.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
