import { InputGroup, Input, InputLeftElement, Icon, chakra, useColorModeValue, forwardRef, InputRightElement, Flex, Box } from '@chakra-ui/react';
import throttle from 'lodash/throttle';
import React from 'react';
import type { ChangeEvent, FormEvent, FocusEvent } from 'react';

import searchIcon from 'icons/search.svg';
import { useScrollDirection } from 'lib/contexts/scrollDirection';
import useIsMobile from 'lib/hooks/useIsMobile';
import ClearButton from 'ui/shared/ClearButton';

interface Props {
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBlur?: (event: FocusEvent<HTMLFormElement>) => void;
  onFocus?: () => void;
  onHide?: () => void;
  onClear: () => void;
  isHomepage?: boolean;
  value: string;
}

const SearchBarInput = ({ onChange, onSubmit, isHomepage, onFocus, onBlur, onHide, onClear, value }: Props, ref: React.ForwardedRef<HTMLFormElement>) => {
  const [ isSticky, setIsSticky ] = React.useState(false);
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  const handleScroll = React.useCallback(() => {
    if (window.pageYOffset !== 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [ ]);

  const handleChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [ onChange ]);

  React.useEffect(() => {
    if (!isMobile || isHomepage) {
      return;
    }
    const throttledHandleScroll = throttle(handleScroll, 300);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  // replicate componentDidMount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isMobile ]);

  const bgColor = useColorModeValue('white', 'black');
  const transformMobile = scrollDirection !== 'down' ? 'translateY(0)' : 'translateY(-100%)';

  React.useEffect(() => {
    if (isMobile && scrollDirection === 'down') {
      onHide?.();
    }
  }, [ scrollDirection, onHide, isMobile ]);

  return (
    <chakra.form
      ref={ ref }
      noValidate
      onSubmit={ onSubmit }
      onBlur={ onBlur }
      onFocus={ onFocus }
      w={{base:"100%",lg:'50%'}}
      backgroundColor={ isHomepage ? 'white' : bgColor }
      borderRadius={{ base: isHomepage ? 'base' : 'none', lg: 'base' }}
      top={{ base: isHomepage ? 0 : 55, lg: 0 }}
      left="0"
      zIndex={{ base: isHomepage ? 'auto' : 'sticky1', lg: 'auto' }}
      paddingX={0}
      paddingTop={0}
      paddingBottom={0}
      boxShadow={ scrollDirection !== 'down' && isSticky ? 'md' : 'none' }

    >
      <Flex>
        <InputGroup size={{ base: isHomepage ? 'md' : 'sm', lg: 'md' }}>

          <Input
            pl={{ base: '26px' }}
            pr={{ base: '26px' }}
            bg="#F6F6F6"
            placeholder={ isMobile ? 'Search by address / ... ' : 'Search by address / txn hash / block / token... ' }
            onChange={ handleChange }
            border="none"
            color="#9B9B9B"
            value={ value }
            borderTopRightRadius="0 !important"
            borderBottomRightRadius="0 !important"
          />

          <InputRightElement top={{ base: isHomepage ? '18px' : 2, lg: '18px' }} right={ 2 }>
            { value && (<ClearButton onClick={ onClear }/>) }

          </InputRightElement>

        </InputGroup>
        <Flex bg="#000" w="60px" alignItems="center" justifyContent="center" borderTopRightRadius="10px"
          borderBottomRightRadius="10px" >
          <Icon as={ searchIcon } boxSize={{ base: isHomepage ? 6 : 4, lg: 6 }} color={ useColorModeValue('blackAlpha.600', 'whiteAlpha.600') }/>
        </Flex>
      </Flex>
    </chakra.form>
  );
};

export default React.memo(forwardRef(SearchBarInput));
