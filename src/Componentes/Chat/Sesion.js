import React from 'react';
import Grid from '@material-ui/core/Grid';
import Maximized from './Maximized'
import Minimized from './Minimized'
import { ThemeProvider, FixedWrapper } from '@livechat/ui-kit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class CenteredGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: !cookies.get('uid')?"":cookies.get('uid'),
      nombre: !cookies.get('primernombre')?"":cookies.get('primernombre'),
      foto: !cookies.get('Avatar')?"":cookies.get('Avatar'),
      idv: !cookies.get('signin')?"":cookies.get('signin'),
      nombrev: !cookies.get('uid')?"":cookies.get('uid'),
      fotov: !cookies.get('uid')?"":cookies.get('uid'),
    }
  }
  componentDidMount() {
    this.setState({ id: cookies.get('uid'), nombre: cookies.get('primernombre'), foto: cookies.get('Avatar') })
    this.setState({ idv: this.props.idv, nombrev: this.props.nombrev, fotov: this.props.fotov })
  }
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ThemeProvider>
              <FixedWrapper.Root maximizedOnInit>
                <FixedWrapper.Maximized>
                  <Maximized {...this.state} nombre={this.state.nombre} foto={this.state.foto} id={this.state.id} />
                </FixedWrapper.Maximized>
                <FixedWrapper.Minimized>
                  <Minimized {...this.state} />
                </FixedWrapper.Minimized>
              </FixedWrapper.Root>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default CenteredGrid;
