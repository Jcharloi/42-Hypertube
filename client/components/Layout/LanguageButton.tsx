import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useIntl } from 'react-intl';
import useStyles from './LanguageButton.style';
import { Locale } from '../../models/models';

const options = [
  'fr',
  'en',
];

export default function SimpleMenu({ locale, setLocale }: Locale) {
  const classes = useStyles({});
  const { formatMessage: _t } = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };


  const handleClose = (language: string) => {
    setAnchorEl(null);
    if (typeof language === 'string') {
      setLocale(language);
    }
  };

  return (
    <div>
      <Button className={classes.languageToggleButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {_t({ id: `language.${locale}` })}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('fr')}>{_t({ id: 'language.fr' })}</MenuItem>
        <MenuItem onClick={() => handleClose('en')}>{_t({ id: 'language.en' })}</MenuItem>
      </Menu>
    </div>
  );
}
