import { Component, memo, PureComponent } from 'react';

type IUser = {
    name: string
    age: number
}

type IProps = {
    user: IUser
}

// functional component
// React.memo позволяет делать перерендер функционального компонента только если props изменились
const FirstComponent = memo(({ name, age }: IUser) => (
    <div>
        my name is {name}, my age is {age}
    </div>
));

// functional component
// как и сказано в задании:
// "объект `user` меняет свою ссылку, но его свойства остаются неизменными"
// поэтому каждый раз компонент будет считать prop user новым, и делать перерендер, даже если обернуть компонент в React.memo
// React.memo позволяет задать условия перерендера, в этом случае сравнение значений используемых свойств объекта user в предыдущем и текущем состоянии

const SecondComponent = ({ user: { name, age } }: IProps) => (
    <div>
        my name is {name}, my age is {age}
    </div>
)

export const SecondComponentMemoized = memo(
    SecondComponent,
    // prev - объект с предыдущими пропсами компоента
    // next - объект с пропсами которые пришли
    (prev, next) => prev.user.name === next.user.name && prev.user.age === next.user.age
)

// class component
// аналогично React.memo в функциональных компонентах, в классовых компоентах работает PureComponent
class ThirdComponent extends PureComponent<IUser> {
    render() {
        return (
            <div>
                my name is {this.props.name}, my age is {this.props.age}
            </div>
        )
    }
}

// class component
// В FourthComponent ситуация аналогична SecondComponent:
// ссылка на объект this.props.user будет менятся хоть свойства объекта и останутся с теми же значениями
// Для решения оптимизации рендера в классовых компоеннтах используются методы жизненного цикла
// В данном случае я взял shouldComponentUpdate и сравнил в нем будущие значения используемых свойств объекта user с текущими
class FourthComponent extends Component<IProps> {
    shouldComponentUpdate(nextProps: IProps) {
        return (
          nextProps.user.name !== this.props.user.name ||
          nextProps.user.age !== this.props.user.age
        )
    }
    render() {
        return (
            <div>
                my name is {this.props.user.name}, my age is {this.props.user.age}
            </div>
        )
    }
}